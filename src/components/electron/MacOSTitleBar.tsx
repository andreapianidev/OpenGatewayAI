import React from 'react';
import { useElectron } from './ElectronProvider';
import { CreditCard, BarChart3, Settings, Bell } from 'lucide-react';

interface MacOSTitleBarProps {
  title?: string;
  showControls?: boolean;
}

export const MacOSTitleBar: React.FC<MacOSTitleBarProps> = ({ 
  title = 'OpenGateway AI', 
  showControls = true 
}) => {
  const { isElectron } = useElectron();

  if (!isElectron) {
    return null;
  }

  return (
    <div className="h-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 select-none">
      {/* Spazio per i controlli della finestra macOS */}
      <div className="flex items-center space-x-4">
        <div className="w-16"></div> {/* Spazio per i semafori */}
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {/* Titolo centrato */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Controlli a destra */}
      <div className="flex items-center space-x-2">
        <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

// Componente per lo status della connessione
export const ConnectionStatus: React.FC = () => {
  const { isElectron } = useElectron();
  
  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>{isElectron ? 'Desktop App' : 'Web App'}</span>
    </div>
  );
};

// Hook per gestire i menu contestuali macOS
export const useMacOSContextMenu = () => {
  const { isElectron, electronAPI } = useElectron();

  const showContextMenu = (items: Array<{ label: string; action: () => void; separator?: boolean }>) => {
    if (!isElectron) {
      // Fallback per browser - mostra un menu personalizzato
      return;
    }

    // In Electron, potresti implementare menu contestuali nativi
    // Per ora, usiamo un approccio semplificato
  };

  return { showContextMenu };
};