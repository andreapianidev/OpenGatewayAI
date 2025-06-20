import React, { createContext, useContext, useEffect, useState } from 'react';

interface ElectronAPI {
  getVersion: () => Promise<string>;
  showMessageBox: (options: any) => Promise<any>;
  showSaveDialog: (options: any) => Promise<any>;
  showOpenDialog: (options: any) => Promise<any>;
  onNewTransaction: (callback: () => void) => void;
  onExportData: (callback: () => void) => void;
  onOpenPreferences: (callback: () => void) => void;
  removeAllListeners: (channel: string) => void;
  showNotification: (title: string, body: string) => void;
  platform: string;
  isElectron: boolean;
}

interface ElectronContextType {
  isElectron: boolean;
  electronAPI: ElectronAPI | null;
  appVersion: string;
}

const ElectronContext = createContext<ElectronContextType>({
  isElectron: false,
  electronAPI: null,
  appVersion: '1.0.0'
});

export const useElectron = () => {
  const context = useContext(ElectronContext);
  if (!context) {
    throw new Error('useElectron must be used within an ElectronProvider');
  }
  return context;
};

interface ElectronProviderProps {
  children: React.ReactNode;
}

export const ElectronProvider: React.FC<ElectronProviderProps> = ({ children }) => {
  const [isElectron, setIsElectron] = useState(false);
  const [electronAPI, setElectronAPI] = useState<ElectronAPI | null>(null);
  const [appVersion, setAppVersion] = useState('1.0.0');

  useEffect(() => {
    // Controlla se siamo in Electron
    const checkElectron = () => {
      if (typeof window !== 'undefined' && (window as any).electronAPI) {
        setIsElectron(true);
        setElectronAPI((window as any).electronAPI);
        return true;
      }
      return false;
    };

    if (checkElectron()) {
      // Ottieni la versione dell'app
      (window as any).electronAPI.getVersion().then((version: string) => {
        setAppVersion(version);
      }).catch(() => {
        setAppVersion('1.0.0');
      });
    }
  }, []);

  const value: ElectronContextType = {
    isElectron,
    electronAPI,
    appVersion
  };

  return (
    <ElectronContext.Provider value={value}>
      {children}
    </ElectronContext.Provider>
  );
};

// Hook per le funzionalità specifiche di Electron
export const useElectronFeatures = () => {
  const { isElectron, electronAPI } = useElectron();

  const showNotification = (title: string, message: string) => {
    if (isElectron && electronAPI) {
      electronAPI.showNotification(title, message);
    } else {
      // Fallback per browser
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: message });
      }
    }
  };

  const showMessageDialog = async (title: string, message: string, type: 'info' | 'warning' | 'error' = 'info') => {
    if (isElectron && electronAPI) {
      return await electronAPI.showMessageBox({
        type,
        title,
        message,
        buttons: ['OK']
      });
    } else {
      // Fallback per browser
      alert(`${title}: ${message}`);
      return { response: 0 };
    }
  };

  const showSaveDialog = async (defaultPath?: string, filters?: any[]) => {
    if (isElectron && electronAPI) {
      return await electronAPI.showSaveDialog({
        defaultPath,
        filters: filters || [
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'CSV Files', extensions: ['csv'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });
    } else {
      // Fallback per browser - usa download
      return { canceled: false, filePath: defaultPath || 'export.json' };
    }
  };

  const exportData = async (data: any, filename: string = 'export.json') => {
    try {
      const result = await showSaveDialog(filename);
      
      if (!result.canceled) {
        const jsonData = JSON.stringify(data, null, 2);
        
        if (isElectron) {
          // In Electron, il file sarà salvato tramite il dialog nativo
          showNotification('Export Completed', `Data exported to ${result.filePath}`);
        } else {
          // Nel browser, usa il download
          const blob = new Blob([jsonData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showNotification('Export Completed', `Data exported as ${filename}`);
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
      showMessageDialog('Export Error', 'Failed to export data', 'error');
    }
  };

  return {
    isElectron,
    showNotification,
    showMessageDialog,
    showSaveDialog,
    exportData
  };
};