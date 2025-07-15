const { spawn } = require('child_process');
const { execSync } = require('child_process');

console.log('🚀 Iniciando aplicação Electron em modo desenvolvimento...');

// Função para aguardar o servidor estar disponível
function waitForServer(url, timeout = 30000) {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const check = () => {
      const http = require('http');
      const request = http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          setTimeout(check, 1000);
        }
      });
      
      request.on('error', () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout aguardando servidor'));
        } else {
          setTimeout(check, 1000);
        }
      });
    };
    
    check();
  });
}

async function startDev() {
  try {
    console.log('📦 Iniciando servidor de desenvolvimento...');
    
    // Iniciar servidor Vite
    const viteProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });

    viteProcess.stdout.on('data', (data) => {
      console.log(`[Vite] ${data.toString().trim()}`);
    });

    viteProcess.stderr.on('data', (data) => {
      console.log(`[Vite] ${data.toString().trim()}`);
    });

    // Aguardar servidor estar disponível
    console.log('⏳ Aguardando servidor estar disponível...');
    await waitForServer('http://localhost:5173');

    console.log('🔧 Iniciando Electron...');
    
    // Definir variável de ambiente para desenvolvimento
    const env = { ...process.env, NODE_ENV: 'development' };
    
    // Iniciar Electron
    const electronProcess = spawn('npx', ['electron', '.'], {
      stdio: 'inherit',
      shell: true,
      env
    });

    // Cleanup quando Electron fechar
    electronProcess.on('close', () => {
      console.log('🔴 Electron fechado. Encerrando servidor Vite...');
      viteProcess.kill();
      process.exit(0);
    });

    // Cleanup quando processo for interrompido
    process.on('SIGINT', () => {
      console.log('🔴 Encerrando aplicação...');
      electronProcess.kill();
      viteProcess.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar aplicação:', error.message);
    process.exit(1);
  }
}

startDev();