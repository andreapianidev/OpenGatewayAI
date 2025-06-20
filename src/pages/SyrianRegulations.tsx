import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

const SyrianRegulations: React.FC = () => {
  const regulations = [
    {
      id: 1,
      title: 'قانون المصارف السوري رقم 28 لعام 2001',
      status: 'active',
      lastUpdate: '2023-12-15',
      description: 'ينظم عمل المصارف والمؤسسات المالية في الجمهورية العربية السورية',
      compliance: 95
    },
    {
      id: 2,
      title: 'تعليمات مكافحة غسل الأموال وتمويل الإرهاب',
      status: 'active',
      lastUpdate: '2023-11-20',
      description: 'إجراءات وضوابط مكافحة غسل الأموال وتمويل الإرهاب للمؤسسات المالية',
      compliance: 88
    },
    {
      id: 3,
      title: 'قرار مجلس النقد والتسليف رقم 2847',
      status: 'pending',
      lastUpdate: '2024-01-10',
      description: 'تنظيم عمليات الدفع الإلكتروني والمحافظ الرقمية',
      compliance: 72
    },
    {
      id: 4,
      title: 'تعليمات حماية البيانات المالية',
      status: 'review',
      lastUpdate: '2023-10-05',
      description: 'ضوابط حماية وأمان البيانات المالية للعملاء',
      compliance: 91
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'review': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نافذ';
      case 'pending': return 'قيد الانتظار';
      case 'review': return 'قيد المراجعة';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">اللوائح والقوانين السورية</h1>
        <p className="text-gray-600">إدارة ومتابعة الامتثال للقوانين واللوائح المالية في السوق السوري</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">القوانين النافذة</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي اللوائح</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">معدل الامتثال</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulations List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">اللوائح الحالية</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {regulations.map((regulation) => (
            <div key={regulation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900 ml-3">{regulation.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(regulation.status)}`}>
                      {getStatusIcon(regulation.status)}
                      <span className="mr-1">{getStatusText(regulation.status)}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{regulation.description}</p>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 ml-1" />
                      آخر تحديث: {regulation.lastUpdate}
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 ml-2">معدل الامتثال:</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${regulation.compliance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 mr-2">{regulation.compliance}%</span>
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <ExternalLink className="w-4 h-4 ml-1" />
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Alert */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 ml-3" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">تنبيه امتثال</h3>
            <p className="text-yellow-700 mb-4">
              يرجى مراجعة اللوائح الجديدة المتعلقة بالدفع الإلكتروني والتأكد من تطبيق جميع المتطلبات قبل 31 مارس 2024.
            </p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              مراجعة المتطلبات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyrianRegulations;