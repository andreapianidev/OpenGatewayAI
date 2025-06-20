const { contextBridge, ipcRenderer } = require('electron');

// Esponi API sicure al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Informazioni app
  getVersion: () => ipcRenderer.invoke('app-version'),
  
  // Dialog
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
  
  // Eventi dal menu
  onNewTransaction: (callback) => {
    ipcRenderer.on('new-transaction', callback);
  },
  onExportData: (callback) => {
    ipcRenderer.on('export-data', callback);
  },
  onOpenPreferences: (callback) => {
    ipcRenderer.on('open-preferences', callback);
  },
  
  // Rimuovi listener
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  
  // Notifiche
  showNotification: (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  },
  
  // Controllo piattaforma
  platform: process.platform,
  
  // Utilità per il file system (sicure)
  isElectron: true
});

// Gestione delle notifiche
window.addEventListener('DOMContentLoaded', () => {
  // Richiedi permesso per le notifiche
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
});