const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Mantieni un riferimento globale dell'oggetto window
let mainWindow;

function createWindow() {
  // Crea la finestra del browser
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: 'hiddenInset', // Stile macOS nativo
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../public/opengateway-ai-icon.svg'),
    show: false // Non mostrare finché non è pronta
  });

  // Carica l'app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5174');
    // Apri DevTools in sviluppo
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Mostra la finestra quando è pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus sulla finestra
    if (isDev) {
      mainWindow.focus();
    }
  });

  // Gestisci la chiusura della finestra
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Gestisci i link esterni
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Questo metodo sarà chiamato quando Electron ha finito l'inizializzazione
app.whenReady().then(() => {
  createWindow();
  
  // Crea il menu nativo macOS
  createMenu();

  app.on('activate', () => {
    // Su macOS è comune ricreare una finestra nell'app quando
    // l'icona del dock viene cliccata e non ci sono altre finestre aperte
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Esci quando tutte le finestre sono chiuse
app.on('window-all-closed', () => {
  // Su macOS è comune per le applicazioni e la loro barra dei menu
  // rimanere attive finché l'utente non esce esplicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Menu nativo macOS
function createMenu() {
  const template = [
    {
      label: 'OpenGateway AI',
      submenu: [
        {
          label: 'About OpenGateway AI',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About OpenGateway AI',
              message: 'OpenGateway AI',
              detail: 'Payment Gateway Fintech per POS Android e Carte di Debito\nVersion 1.0.0\nDeveloped by Andrea Piani'
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences...',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // Implementa le preferenze
            mainWindow.webContents.send('open-preferences');
          }
        },
        { type: 'separator' },
        {
          label: 'Hide OpenGateway AI',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Transaction',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-transaction');
          }
        },
        { type: 'separator' },
        {
          label: 'Export Data',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('export-data');
          }
        },
        { type: 'separator' },
        {
          label: 'Close Window',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.reload();
          }
        },
        {
          label: 'Force Reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => {
            mainWindow.webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Actual Size',
          accelerator: 'CmdOrCtrl+0',
          role: 'resetzoom'
        },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          role: 'zoomin'
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          role: 'zoomout'
        },
        { type: 'separator' },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'Ctrl+Command+F',
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        { type: 'separator' },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About OpenGateway AI',
          click: () => {
            shell.openExternal('https://github.com/andreapiani/opengateway-ai');
          }
        },
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://github.com/andreapiani/opengateway-ai/wiki');
          }
        },
        { type: 'separator' },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/andreapiani/opengateway-ai/issues');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC handlers per comunicazione con il renderer
ipcMain.handle('app-version', () => {
  return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});

ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

ipcMain.handle('show-open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(mainWindow, options);
  return result;
});