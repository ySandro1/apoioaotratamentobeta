# 🚀 Configuração do Electron para RD Saúde

Este guia te ajudará a criar um aplicativo executável para Windows do sistema RD Saúde.

## 📋 Pré-requisitos

1. **Node.js** (versão 16 ou superior)
2. **npm** ou **yarn**
3. **Git** (para algumas dependências)

## 🔧 Instalação das Dependências

Execute os seguintes comandos no terminal na pasta do projeto:

```bash
# Instalar dependências do Electron
npm install --save-dev electron@latest
npm install --save-dev electron-builder@latest
npm install --save-dev concurrently@latest
npm install --save-dev wait-on@latest

# Ou usando yarn
yarn add --dev electron@latest electron-builder@latest concurrently@latest wait-on@latest
```

## 📦 Scripts do Package.json

Adicione os seguintes scripts ao seu `package.json`:

```json
{
  "main": "electron.js",
  "scripts": {
    "electron": "electron .",
    "electron-dev": "node scripts/dev-electron.js",
    "electron-build": "node scripts/build-electron.js",
    "dist": "npm run build && electron-builder",
    "dist-win": "npm run build && electron-builder --win",
    "dist-portable": "npm run build && electron-builder --win portable"
  }
}
```

## 🏃‍♂️ Como Usar

### Desenvolvimento
```bash
# Executar em modo desenvolvimento (hot-reload)
npm run electron-dev
```

### Build para Produção
```bash
# Gerar executável para Windows (instalador + portátil)
npm run dist-win

# Apenas versão portátil
npm run dist-portable

# Para todos os sistemas operacionais
npm run dist
```

## 📁 Estrutura de Arquivos

```
projeto/
├── electron.js                 # Arquivo principal do Electron
├── electron-builder.json       # Configuração do build
├── scripts/
│   ├── build-electron.js      # Script de build
│   └── dev-electron.js        # Script de desenvolvimento
├── dist/                      # Build da aplicação web
└── dist-electron/             # Executáveis gerados
    ├── RD-Saude-Setup-1.0.0.exe      # Instalador
    └── RD-Saude-Portable-1.0.0.exe   # Versão portátil
```

## 🎯 Recursos do App Desktop

### Menu Principal
- **Arquivo**: Novo Apoio, Sair
- **Editar**: Desfazer, Refazer, Copiar, Colar, etc.
- **Ver**: Recarregar, Zoom, Tela Cheia, DevTools
- **Janela**: Minimizar, Fechar
- **Ajuda**: Sobre o RD Saúde

### Características
- ✅ Ícone personalizado
- ✅ Menu nativo do Windows
- ✅ Instalador automático
- ✅ Versão portátil (não precisa instalar)
- ✅ Atalhos de teclado
- ✅ Janela "Sobre" personalizada
- ✅ Configurações de segurança

## 🔍 Resolução de Problemas

### Erro de instalação do Electron
Se houver erro ao instalar, tente:

```bash
# Limpar cache do npm
npm cache clean --force

# Instalar com diferentes flags
npm install electron --save-dev --force
npm install electron --save-dev --legacy-peer-deps
```

### Electron não inicia
1. Verifique se o Node.js está atualizado
2. Execute `npm run build` primeiro
3. Verifique se a porta 5173 está livre

### Build falha
1. Execute `npm run build` manualmente
2. Verifique se a pasta `dist` foi criada
3. Confirme que todos os arquivos estão na pasta `dist`

## 📝 Customização

### Alterar Ícone
Substitua o arquivo `public/pwa-icon-192.png` pelo seu ícone personalizado.

### Alterar Informações do App
Edite o arquivo `electron-builder.json`:
- `productName`: Nome do aplicativo
- `appId`: ID único do app
- `publisherName`: Nome do desenvolvedor

### Personalizar Menu
Edite a seção `template` no arquivo `electron.js`.

## 🎉 Resultado Final

Após executar `npm run dist-win`, você terá:

1. **RD-Saude-Setup-1.0.0.exe** - Instalador completo
2. **RD-Saude-Portable-1.0.0.exe** - Versão portátil

O aplicativo funcionará offline e terá todas as funcionalidades da versão web!

## 💡 Dicas Extras

- Use a versão portátil para não precisar instalar
- O app salva dados localmente (mesmo offline)
- Para distribuir, compartilhe apenas o arquivo .exe
- O aplicativo abrirá automaticamente na resolução adequada

---

**Desenvolvido por Alexsandro - Itumbiara 3 💚**