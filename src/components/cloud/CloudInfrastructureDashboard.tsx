import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Shield, Activity, DollarSign, Users, Zap } from 'lucide-react';

// Tipi per i servizi cloud
interface CloudService {
  id: string;
  name: string;
  provider: 'AWS' | 'Azure' | 'Google Cloud' | 'Digital Ocean';
  type: 'compute' | 'database' | 'storage' | 'network' | 'security';
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  region: string;
  cost: number;
  usage: number;
  lastUpdated: string;
}

interface CloudMetrics {
  totalCost: number;
  totalServices: number;
  activeServices: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkTraffic: number;
}

interface CloudInfrastructureDashboardProps {
  onServiceSelect?: (service: CloudService) => void;
  onProviderFilter?: (provider: string) => void;
}

const CloudInfrastructureDashboard: React.FC<CloudInfrastructureDashboardProps> = ({
  onServiceSelect,
  onProviderFilter
}) => {
  const [services, setServices] = useState<CloudService[]>([]);
  const [metrics, setMetrics] = useState<CloudMetrics>({
    totalCost: 0,
    totalServices: 0,
    activeServices: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    storageUsage: 0,
    networkTraffic: 0
  });
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simulazione dati cloud
  useEffect(() => {
    const generateMockServices = (): CloudService[] => {
      const providers: Array<'AWS' | 'Azure' | 'Google Cloud' | 'Digital Ocean'> = ['AWS', 'Azure', 'Google Cloud', 'Digital Ocean'];
      const types: Array<'compute' | 'database' | 'storage' | 'network' | 'security'> = ['compute', 'database', 'storage', 'network', 'security'];
      const statuses: Array<'running' | 'stopped' | 'error' | 'maintenance'> = ['running', 'stopped', 'error', 'maintenance'];
      const regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1', 'us-west-2', 'eu-central-1'];
      
      return Array.from({ length: 25 }, (_, i) => ({
        id: `service-${i + 1}`,
        name: `${providers[i % providers.length]}-${types[i % types.length]}-${i + 1}`,
        provider: providers[i % providers.length],
        type: types[i % types.length],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        cost: Math.random() * 500 + 50,
        usage: Math.random() * 100,
        lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString()
      }));
    };

    const mockServices = generateMockServices();
    setServices(mockServices);

    // Calcola metriche
    const totalCost = mockServices.reduce((sum, service) => sum + service.cost, 0);
    const activeServices = mockServices.filter(s => s.status === 'running').length;
    
    setMetrics({
      totalCost,
      totalServices: mockServices.length,
      activeServices,
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      storageUsage: Math.random() * 100,
      networkTraffic: Math.random() * 1000
    });

    setLoading(false);
  }, []);

  const filteredServices = selectedProvider === 'all' 
    ? services 
    : services.filter(service => service.provider === selectedProvider);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'text-orange-600 bg-orange-100';
      case 'Azure': return 'text-blue-600 bg-blue-100';
      case 'Google Cloud': return 'text-green-600 bg-green-100';
      case 'Digital Ocean': return 'text-cyan-600 bg-cyan-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cloud className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Infrastruttura Cloud</h2>
            <p className="text-gray-600">Monitoraggio servizi multi-cloud</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Sviluppato da Andrea Piani - andrea.piani@email.com
        </div>
      </div>

      {/* Metriche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Costo Totale</p>
              <p className="text-2xl font-bold">${metrics.totalCost.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Servizi Attivi</p>
              <p className="text-2xl font-bold">{metrics.activeServices}/{metrics.totalServices}</p>
            </div>
            <Server className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">CPU Usage</p>
              <p className="text-2xl font-bold">{metrics.cpuUsage.toFixed(1)}%</p>
            </div>
            <Activity className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Storage</p>
              <p className="text-2xl font-bold">{metrics.storageUsage.toFixed(1)}%</p>
            </div>
            <Database className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Filtri */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="text-sm font-medium text-gray-700">Provider:</label>
        <select
          value={selectedProvider}
          onChange={(e) => {
            setSelectedProvider(e.target.value);
            onProviderFilter?.(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tutti i Provider</option>
          <option value="AWS">AWS</option>
          <option value="Azure">Azure</option>
          <option value="Google Cloud">Google Cloud</option>
          <option value="Digital Ocean">Digital Ocean</option>
        </select>
      </div>

      {/* Lista servizi */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servizio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Regione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo/mese
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilizzo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => (
              <tr
                key={service.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onServiceSelect?.(service)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-500">{service.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProviderColor(service.provider)}`}>
                    {service.provider}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {service.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {service.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${service.cost.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${service.usage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{service.usage.toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CloudInfrastructureDashboard;

// Sviluppato da Andrea Piani - andrea.piani@email.com