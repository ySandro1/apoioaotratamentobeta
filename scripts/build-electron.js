const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build do aplicativo Electron...');

try {
  // 1. Build da aplicação web
  console.log('📦 Fazendo build da aplicação web...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Verificar se o diretório dist existe
  if (!fs.existsSync('dist')) {
    throw new Error('Diretório dist não foi criado. Verifique o build do Vite.');
  }

  // 3. Criar package.json temporário para o Electron
  const electronPackageJson = {
    "name": "rd-saude-electron",
    "version": "1.0.0",
    "description": "RD Saúde - Sistema de Apoio ao Tratamento",
    "main": "electron.js",
    "author": "Alexsandro - Itumbiara 3",
    "license": "MIT"
  };

  fs.writeFileSync('dist/package.json', JSON.stringify(electronPackageJson, null, 2));

  // 4. Copiar electron.js para dist
  fs.copyFileSync('electron.js', 'dist/electron.js');

  console.log('✅ Build concluído com sucesso!');
  console.log('📁 Arquivos prontos na pasta dist/');
  console.log('🔧 Para gerar o executável, execute: npm run dist');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}