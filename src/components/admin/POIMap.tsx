import React from 'react';
import { MapPin, Store, TrendingUp, Users } from 'lucide-react';

interface POILocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  transactions: number;
  revenue: number;
  status: 'active' | 'inactive';
  category: string;
}

interface POIMapProps {
  locations: POILocation[];
}

const POIMap: React.FC<POIMapProps> = ({ locations }) => {
  const activeLocations = locations.filter(loc => loc.status === 'active');
  const totalRevenue = locations.reduce((sum, loc) => sum + loc.revenue, 0);
  const totalTransactions = locations.reduce((sum, loc) => sum + loc.transactions, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Merchant Locations</h3>
            <p className="text-sm text-gray-500">{activeLocations.length} active stores</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Network</p>
          <p className="font-bold text-green-600">€{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Simulated Map View */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-64 mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Map Markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 12) % 40}%`
            }}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-125 ${
              location.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border">
              <div className="flex items-center space-x-2 mb-2">
                <Store className="w-4 h-4 text-blue-500" />
                <p className="font-semibold text-gray-900 text-sm">{location.name}</p>
              </div>
              <p className="text-xs text-gray-600 mb-2">{location.address}</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Revenue:</span>
                <span className="font-semibold text-green-600">€{location.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Transactions:</span>
                <span className="font-semibold text-blue-600">{location.transactions}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Category:</span>
                <span className="font-semibold text-purple-600">{location.category}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold text-gray-600">+</span>
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold text-gray-600">-</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600">Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Store className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-lg font-bold text-green-600">{activeLocations.length}</p>
          <p className="text-xs text-gray-600">Active Stores</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-lg font-bold text-blue-600">{totalTransactions.toLocaleString()}</p>
          <p className="text-xs text-gray-600">Transactions</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-lg font-bold text-purple-600">€{activeLocations.length > 0 ? (totalRevenue / activeLocations.length).toFixed(0) : '0'}</p>
          <p className="text-xs text-gray-600">Avg Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default POIMap;