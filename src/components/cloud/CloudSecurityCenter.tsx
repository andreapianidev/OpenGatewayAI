import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, Key, FileText, Users, Server } from 'lucide-react';

// Tipi per la sicurezza cloud
interface SecurityAlert {
  id: string;
  type: 'vulnerability' | 'compliance' | 'access' | 'configuration';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  service: string;
  provider: string;
  detected: string;
  status: 'open' | 'investigating' | 'resolved';
  cve?: string;
}

interface ComplianceFramework {
  name: string;
  standard: 'SOC2' | 'ISO27001' | 'GDPR' | 'HIPAA' | 'PCI-DSS';
  score: number;
  controls: number;
  passed: number;
  failed: number;
  lastAudit: string;
}

interface SecurityMetric {
  category: string;
  score: number;
  maxScore: number;
}

interface AccessEvent {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high';
  success: boolean;
}

interface VulnerabilityTrend {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface CloudSecurityCenterProps {
  onAlertClick?: (alert: SecurityAlert) => void;
  onComplianceView?: (framework: ComplianceFramework) => void;
}

const CloudSecurityCenter: React.FC<CloudSecurityCenterProps> = ({
  onAlertClick,
  onComplianceView
}) => {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [accessEvents, setAccessEvents] = useState<AccessEvent[]>([]);
  const [vulnerabilityTrends, setVulnerabilityTrends] = useState<VulnerabilityTrend[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'alerts' | 'compliance' | 'access'>('overview');
  const [loading, setLoading] = useState(true);

  // Simulazione dati di sicurezza
  useEffect(() => {
    const generateSecurityAlerts = (): SecurityAlert[] => {
      const types: Array<'vulnerability' | 'compliance' | 'access' | 'configuration'> = ['vulnerability', 'compliance', 'access', 'configuration'];
      const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
      const statuses: Array<'open' | 'investigating' | 'resolved'> = ['open', 'investigating', 'resolved'];
      const providers = ['AWS', 'Azure', 'Google Cloud', 'Digital Ocean'];
      const services = ['EC2', 'RDS', 'S3', 'Lambda', 'VPC', 'IAM', 'CloudTrail'];
      
      const alertTitles = {
        vulnerability: ['CVE-2023-1234 detected', 'Outdated SSL certificate', 'Unpatched system vulnerability'],
        compliance: ['GDPR violation detected', 'SOC2 control failure', 'Data retention policy breach'],
        access: ['Suspicious login attempt', 'Privilege escalation detected', 'Unauthorized API access'],
        configuration: ['Security group misconfiguration', 'Public S3 bucket detected', 'Weak password policy']
      };
      
      return Array.from({ length: 15 }, (_, i) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        
        return {
          id: `alert-${i + 1}`,
          type,
          severity,
          title: alertTitles[type][Math.floor(Math.random() * alertTitles[type].length)],
          description: `Detailed description of security alert ${i + 1}`,
          service: services[Math.floor(Math.random() * services.length)],
          provider: providers[Math.floor(Math.random() * providers.length)],
          detected: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          cve: type === 'vulnerability' ? `CVE-2023-${1000 + i}` : undefined
        };
      });
    };

    const generateComplianceFrameworks = (): ComplianceFramework[] => {
      const standards: Array<'SOC2' | 'ISO27001' | 'GDPR' | 'HIPAA' | 'PCI-DSS'> = ['SOC2', 'ISO27001', 'GDPR', 'HIPAA', 'PCI-DSS'];
      
      return standards.map((standard, i) => {
        const controls = 50 + Math.floor(Math.random() * 100);
        const passed = Math.floor(controls * (0.7 + Math.random() * 0.25));
        
        return {
          name: `${standard} Compliance`,
          standard,
          score: (passed / controls) * 100,
          controls,
          passed,
          failed: controls - passed,
          lastAudit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
      });
    };

    const generateSecurityMetrics = (): SecurityMetric[] => {
      return [
        { category: 'Identity & Access', score: 85, maxScore: 100 },
        { category: 'Network Security', score: 92, maxScore: 100 },
        { category: 'Data Protection', score: 78, maxScore: 100 },
        { category: 'Incident Response', score: 88, maxScore: 100 },
        { category: 'Compliance', score: 82, maxScore: 100 },
        { category: 'Vulnerability Management', score: 75, maxScore: 100 }
      ];
    };

    const generateAccessEvents = (): AccessEvent[] => {
      const users = ['admin@company.com', 'dev@company.com', 'security@company.com', 'analyst@company.com'];
      const actions = ['login', 'resource_access', 'permission_change', 'data_export', 'config_update'];
      const resources = ['AWS Console', 'Azure Portal', 'GCP Dashboard', 'Database', 'API Gateway'];
      const locations = ['Milano, IT', 'Roma, IT', 'New York, US', 'London, UK', 'Tokyo, JP'];
      const riskLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
      
      return Array.from({ length: 20 }, (_, i) => ({
        id: `event-${i + 1}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        resource: resources[Math.floor(Math.random() * resources.length)],
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        location: locations[Math.floor(Math.random() * locations.length)],
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        success: Math.random() > 0.1
      }));
    };

    const generateVulnerabilityTrends = (): VulnerabilityTrend[] => {
      const now = new Date();
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
        return {
          date: date.toISOString().split('T')[0],
          critical: Math.floor(Math.random() * 5),
          high: Math.floor(Math.random() * 15),
          medium: Math.floor(Math.random() * 25),
          low: Math.floor(Math.random() * 35)
        };
      });
    };

    setSecurityAlerts(generateSecurityAlerts());
    setComplianceFrameworks(generateComplianceFrameworks());
    setSecurityMetrics(generateSecurityMetrics());
    setAccessEvents(generateAccessEvents());
    setVulnerabilityTrends(generateVulnerabilityTrends());
    setLoading(false);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'investigating': return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const criticalAlerts = securityAlerts.filter(alert => alert.severity === 'critical' && alert.status === 'open').length;
  const highAlerts = securityAlerts.filter(alert => alert.severity === 'high' && alert.status === 'open').length;
  const avgComplianceScore = complianceFrameworks.reduce((sum, framework) => sum + framework.score, 0) / complianceFrameworks.length;
  const securityScore = securityMetrics.reduce((sum, metric) => sum + metric.score, 0) / securityMetrics.length;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Centro Sicurezza Cloud</h2>
              <p className="text-gray-600">Monitoraggio sicurezza e compliance multi-cloud</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Sviluppato da Andrea Piani - andrea.piani@email.com
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTab === 'overview'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Panoramica
          </button>
          <button
            onClick={() => setSelectedTab('alerts')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTab === 'alerts'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Alert Sicurezza
          </button>
          <button
            onClick={() => setSelectedTab('compliance')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTab === 'compliance'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Compliance
          </button>
          <button
            onClick={() => setSelectedTab('access')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTab === 'access'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Accessi
          </button>
        </div>
      </div>

      {/* Metriche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Alert Critici</p>
              <p className="text-2xl font-bold">{criticalAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Alert High</p>
              <p className="text-2xl font-bold">{highAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Security Score</p>
              <p className="text-2xl font-bold">{securityScore.toFixed(0)}%</p>
            </div>
            <Shield className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Compliance</p>
              <p className="text-2xl font-bold">{avgComplianceScore.toFixed(0)}%</p>
            </div>
            <FileText className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Radar */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Posture</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={securityMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Security Score"
                  dataKey="score"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Vulnerability Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Vulnerabilità</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vulnerabilityTrends.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="critical" stackId="a" fill="#EF4444" name="Critical" />
                <Bar dataKey="high" stackId="a" fill="#F97316" name="High" />
                <Bar dataKey="medium" stackId="a" fill="#EAB308" name="Medium" />
                <Bar dataKey="low" stackId="a" fill="#3B82F6" name="Low" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedTab === 'alerts' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert di Sicurezza</h3>
          <div className="space-y-4">
            {securityAlerts.slice(0, 10).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 ${getSeverityColor(alert.severity)}`}
                onClick={() => onAlertClick?.(alert)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(alert.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{alert.provider} - {alert.service}</span>
                        {alert.cve && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">{alert.cve}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.detected).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {complianceFrameworks.map((framework) => (
            <div
              key={framework.standard}
              className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onComplianceView?.(framework)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  framework.score >= 90 ? 'bg-green-100 text-green-800' :
                  framework.score >= 75 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {framework.score.toFixed(0)}%
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Controlli Superati</span>
                  <span>{framework.passed}/{framework.controls}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      framework.score >= 90 ? 'bg-green-500' :
                      framework.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${framework.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Controlli Totali</p>
                  <p className="font-medium">{framework.controls}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ultimo Audit</p>
                  <p className="font-medium">{new Date(framework.lastAudit).toLocaleDateString('it-IT')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'access' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventi di Accesso Recenti</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azione</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risorsa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posizione</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rischio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessEvents.slice(0, 15).map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.resource}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(event.riskLevel)}`}>
                        {event.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.success ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.timestamp).toLocaleString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudSecurityCenter;

// Sviluppato da Andrea Piani - andrea.piani@email.com