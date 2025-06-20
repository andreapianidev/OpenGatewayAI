# OpenGateway AI - App Nativa macOS

![OpenGateway AI](./assets/opengateway-ai-banner.svg)

## 🍎 App Nativa per macOS

OpenGateway AI è ora disponibile come applicazione nativa per macOS, offrendo un'esperienza desktop completa per la gestione del gateway di pagamento fintech con POS Android e carte di debito.

## ✨ Caratteristiche Native macOS

### 🎨 Interfaccia Nativa
- **Barra del titolo macOS** con controlli nativi
- **Menu nativo** con scorciatoie da tastiera
- **Supporto Dark Mode** automatico
- **Notifiche native** del sistema
- **Dialog nativi** per salvataggio/apertura file

### 🔧 Funzionalità Desktop
- **Export dati** con dialog nativo di salvataggio
- **Scorciatoie da tastiera** complete
- **Menu contestuali** nativi
- **Gestione finestre** ottimizzata
- **Auto-updater** integrato

### 🛡️ Sicurezza
- **Hardened Runtime** abilitato
- **Code signing** per distribuzione
- **Sandboxing** per sicurezza
- **Entitlements** configurati

## 🚀 Installazione e Sviluppo

### Prerequisiti
```bash
# Node.js 18+ e npm
node --version
npm --version

# Xcode Command Line Tools (per macOS)
xcode-select --install
```

### Installazione Dipendenze
```bash
# Installa tutte le dipendenze
npm install

# Installa dipendenze native Electron
npm run postinstall
```

### Sviluppo
```bash
# Avvia in modalità sviluppo (web + Electron)
npm run electron:dev

# Solo web (per sviluppo frontend)
npm run dev

# Solo Electron (richiede build precedente)
npm run electron
```

### Build e Distribuzione
```bash
# Build per produzione
npm run build

# Crea pacchetto Electron (senza distribuzione)
npm run electron:pack

# Crea installer DMG per macOS
npm run electron:dist
```

## 📦 Struttura App Nativa

```
electron/
├── main.js              # Processo principale Electron
├── preload.js           # Script preload sicuro
└── entitlements.mac.plist # Entitlements macOS

src/components/electron/
├── ElectronProvider.tsx  # Provider React per Electron
└── MacOSTitleBar.tsx    # Barra titolo nativa macOS

dist-electron/           # Output build nativo
├── OpenGateway AI.app   # App macOS
├── OpenGateway AI.dmg   # Installer DMG
└── OpenGateway AI.zip   # Archivio distribuzione
```

## 🎯 Funzionalità Specifiche macOS

### Menu Nativo
- **File**: Nuova transazione, Export dati
- **Edit**: Undo/Redo, Copy/Paste
- **View**: Zoom, Fullscreen, DevTools
- **Window**: Minimize, Close, Bring to Front
- **Help**: About, Documentation, Report Issue

### Scorciatoie da Tastiera
- `Cmd+N`: Nuova transazione
- `Cmd+E`: Export dati
- `Cmd+,`: Preferenze
- `Cmd+R`: Ricarica
- `Cmd+Shift+R`: Ricarica forzata
- `F12`: Toggle DevTools
- `Cmd+0`: Zoom normale
- `Cmd++`: Zoom in
- `Cmd+-`: Zoom out
- `Ctrl+Cmd+F`: Fullscreen

### Notifiche Native
```typescript
// Esempio utilizzo notifiche
import { useElectronFeatures } from './components/electron/ElectronProvider';

const { showNotification } = useElectronFeatures();

// Mostra notifica nativa
showNotification('Transazione Completata', 'Pagamento di €150.00 processato con successo');
```

### Export Dati Nativo
```typescript
// Esempio export con dialog nativo
const { exportData } = useElectronFeatures();

// Export con dialog di salvataggio nativo
await exportData(transactionData, 'transactions-2024.json');
```

## 🔧 Configurazione Build

### Electron Builder
La configurazione in `package.json` include:

```json
{
  "build": {
    "appId": "com.andreapiani.opengateway-ai",
    "productName": "OpenGateway AI",
    "mac": {
      "category": "public.app-category.finance",
      "target": ["dmg", "zip"],
      "arch": ["x64", "arm64"]
    }
  }
}
```

### Supporto Architetture
- **Intel (x64)**: Compatibilità completa
- **Apple Silicon (arm64)**: Ottimizzazione nativa
- **Universal Binary**: Build per entrambe le architetture

## 🛠️ Sviluppo e Debug

### DevTools
```bash
# Apri DevTools in sviluppo
npm run electron:dev
# Premi F12 o Cmd+Shift+I
```

### Log e Debug
```javascript
// Nel processo principale (main.js)
console.log('Main process log');

// Nel renderer (React)
console.log('Renderer process log');

// IPC Communication
ipcRenderer.invoke('debug-info');
```

### Hot Reload
L'app supporta hot reload completo:
- **Frontend**: Vite HMR
- **Electron**: Restart automatico su modifiche

## 📱 Integrazione con Funzionalità Esistenti

### Dashboard Amministrativo
- **Gestione POS Android** nativa
- **Analytics AI** in tempo reale
- **Gestione carte di debito** avanzata
- **Monitoraggio transazioni** live

### Sicurezza Fintech
- **PCI-DSS Ready** compliance
- **Crittografia** end-to-end
- **Audit trail** completo
- **Backup automatico** dati sensibili

## 🚀 Distribuzione

### App Store
```bash
# Prepara per App Store
npm run electron:dist -- --mac mas

# Code signing automatico
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate_password"
```

### Distribuzione Diretta
```bash
# Crea DMG per distribuzione diretta
npm run electron:dist

# Output in dist-electron/
# - OpenGateway AI.dmg (installer)
# - OpenGateway AI.zip (archivio)
```

## 🔄 Auto-Update

L'app supporta aggiornamenti automatici:

```json
{
  "publish": {
    "provider": "github",
    "owner": "andreapiani",
    "repo": "opengateway-ai"
  }
}
```

## 📞 Supporto

### Problemi Comuni
1. **Errore code signing**: Verifica certificati sviluppatore
2. **Permessi notifiche**: Controlla impostazioni sistema
3. **Performance**: Usa build di produzione per test

### Contatti
- **Sviluppatore**: Andrea Piani
- **Email**: [support@opengateway-ai.com]
- **GitHub**: [Issues](https://github.com/andreapiani/opengateway-ai/issues)

---

**OpenGateway AI** - Payment Gateway Fintech per POS Android e Carte di Debito  
*Ora disponibile come app nativa macOS* 🍎