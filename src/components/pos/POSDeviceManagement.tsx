import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Smartphone,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Settings,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { POSDevice } from '../../types/pos';

interface POSDeviceManagementProps {
  devices: POSDevice[];
  selectedDevice: POSDevice | null;
  setSelectedDevice: (device: POSDevice | null) => void;
  addDevice: () => void;
  updateDevice: (deviceId: string, updates: Partial<POSDevice>) => void;
  removeDevice: (deviceId: string) => void;
  restartDevice: (deviceId: string) => void;
}

const POSDeviceManagement: React.FC<POSDeviceManagementProps> = ({
  devices,
  selectedDevice,
  setSelectedDevice,
  addDevice,
  updateDevice,
  removeDevice,
  restartDevice
}) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4" />;
      case 'offline': return <XCircle className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getBatteryIcon = (level: number) => {
    if (level < 20) {
      return <BatteryLow className="h-4 w-4 text-red-500" />;
    }
    return <Battery className="h-4 w-4 text-green-500" />;
  };

  const renderDeviceCard = (device: POSDevice) => (
    <div key={device.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{device.name}</h4>
            <p className="text-sm text-gray-500">{device.model}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
            getStatusColor(device.status)
          }`}>
            {getStatusIcon(device.status)}
            <span>{device.status}</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Posizione</p>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <p className="text-sm font-medium">{device.location}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Batteria</p>
          <div className="flex items-center space-x-1">
            {getBatteryIcon(device.batteryLevel)}
            <p className="text-sm font-medium">{device.batteryLevel}%</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Connessione</p>
          <div className="flex items-center space-x-1">
            {device.isConnected ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <p className="text-sm font-medium">
              {device.isConnected ? 'Connesso' : 'Disconnesso'}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ultimo Aggiornamento</p>
          <p className="text-sm font-medium">
            {new Date(device.lastSeen).toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedDevice(device)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
        >
          <Settings className="h-4 w-4" />
          <span>Configura</span>
        </button>
        <button
          onClick={() => restartDevice(device.id)}
          className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center justify-center"
          disabled={device.status === 'offline'}
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button
          onClick={() => removeDevice(device.id)}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const renderDeviceDetails = () => {
    if (!selectedDevice) return null;

    return (
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Configurazione Dispositivo: {selectedDevice.name}</h3>
          <button
            onClick={() => setSelectedDevice(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Dispositivo
              </label>
              <input
                type="text"
                value={selectedDevice.name}
                onChange={(e) => updateDevice(selectedDevice.id, { name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posizione
              </label>
              <input
                type="text"
                value={selectedDevice.location}
                onChange={(e) => updateDevice(selectedDevice.id, { location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stato
              </label>
              <select
                value={selectedDevice.status}
                onChange={(e) => updateDevice(selectedDevice.id, { status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Manutenzione</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Statistiche Dispositivo</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Transazioni Oggi</span>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Uptime</span>
                  <span className="text-sm font-medium">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Ultima Manutenzione</span>
                  <span className="text-sm font-medium">15/01/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Versione Firmware</span>
                  <span className="text-sm font-medium">v2.1.3</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Azioni Rapide</h4>
              <div className="space-y-2">
                <button
                  onClick={() => restartDevice(selectedDevice.id)}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Riavvia Dispositivo</span>
                </button>
                <button
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Aggiorna Firmware</span>
                </button>
                <button
                  className="w-full px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Modalità Manutenzione</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Gestione Dispositivi POS</h2>
          <button
            onClick={addDevice}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Aggiungi Dispositivo</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Dispositivi Totali</p>
                <p className="text-2xl font-bold">{devices.length}</p>
              </div>
              <Smartphone className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Online</p>
                <p className="text-2xl font-bold">{devices.filter(d => d.status === 'online').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Offline</p>
                <p className="text-2xl font-bold">{devices.filter(d => d.status === 'offline').length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map(renderDeviceCard)}
        </div>

        {renderDeviceDetails()}
      </div>
    </div>
  );
};

export default POSDeviceManagement;