import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Filter, Download, Calendar, BookOpen } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import type { User } from '../App';

interface ComplianceDashboardProps {
  user: User;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ user }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCompliance, setSelectedCompliance] = useState('all');

  const complianceSpendData = [
    { name: 'RBI Guidelines', value: 78000, color: '#EF4444', percentage: 35, type: 'Mandatory' },
    { name: 'IRDAI Requirements', value: 45000, color: '#F59E0B', percentage: 20, type: 'Mandatory' },
    { name: 'PCI-DSS 4.0', value: 42000, color: '#8B5CF6', percentage: 19, type: 'Mandatory' },
    { name: 'DPDP Act', value: 32000, color: '#10B981', percentage: 14, type: 'Mandatory' },
    { name: 'MeitY Policy', value: 25000, color: '#3B82F6', percentage: 11, type: 'Mandatory' },
    { name: 'ISO 27001', value: 18000, color: '#6B7280', percentage: 8, type: 'Advisory' },
  ];

  const monthlyComplianceData = [
    { month: 'Jan', RBI: 68000, IRDAI: 38000, PCI: 35000, DPDP: 28000, MeitY: 22000, ISO: 15000 },
    { month: 'Feb', RBI: 72000, IRDAI: 40000, PCI: 37000, DPDP: 29000, MeitY: 23000, ISO: 16000 },
    { month: 'Mar', RBI: 75000, IRDAI: 42000, PCI: 39000, DPDP: 30000, MeitY: 24000, ISO: 17000 },
    { month: 'Apr', RBI: 76000, IRDAI: 43000, PCI: 40000, DPDP: 31000, MeitY: 24500, ISO: 17500 },
    { month: 'May', RBI: 77000, IRDAI: 44000, PCI: 41000, DPDP: 31500, MeitY: 24800, ISO: 17800 },
    { month: 'Jun', RBI: 78000, IRDAI: 45000, PCI: 42000, DPDP: 32000, MeitY: 25000, ISO: 18000 },
  ];

  const complianceAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'RBI Data Localization Breach Risk',
      description: 'Resources detected outside approved Indian regions',
      resource: 'rds-prod-customer-data',
      framework: 'RBI Guidelines',
      time: '15 minutes ago',
      cost: '$4,200/month',
      action: 'Migrate to India regions'
    },
    {
      id: 2,
      type: 'warning',
      title: 'PCI-DSS 4.0 Transition Required',
      description: 'Current PCI-DSS 3.2.1 implementation expires March 2025',
      resource: 'payment-processing-cluster',
      framework: 'PCI-DSS',
      time: '2 hours ago',
      cost: '$8,500/month',
      action: 'Plan v4.0 upgrade'
    },
    {
      id: 3,
      type: 'warning',
      title: 'IRDAI Audit Trail Insufficient',
      description: 'Log retention below 7-year requirement for insurance data',
      resource: 'insurance-data-lake',
      framework: 'IRDAI',
      time: '4 hours ago',
      cost: '$1,200/month',
      action: 'Extend log retention'
    },
    {
      id: 4,
      type: 'info',
      title: 'DPDP Act Consent Management Update',
      description: 'New consent management features available',
      resource: 'consent-management-system',
      framework: 'DPDP Act',
      time: '1 day ago',
      cost: '$800/month',
      action: 'Review and implement'
    },
  ];

  const complianceMetrics = [
    {
      title: 'Total Compliance Spend',
      value: '$240,000',
      change: '+12.4%',
      trend: 'up',
      target: '$250,000',
      status: 'good'
    },
    {
      title: 'Policy Violations',
      value: '2',
      change: '-1',
      trend: 'down',
      target: '0',
      status: 'warning'
    },
    {
      title: 'Compliance Score',
      value: '96%',
      change: '+3%',
      trend: 'up',
      target: '98%',
      status: 'good'
    },
    {
      title: 'At-Risk Resources',
      value: '8',
      change: '+2',
      trend: 'up',
      target: '0',
      status: 'critical'
    },
  ];

  const frameworkDetails = [
    {
      name: 'RBI Guidelines',
      status: 'compliant',
      lastAudit: '2024-05-15',
      nextReview: '2024-08-15',
      cost: 78000,
      requirements: 15,
      implemented: 14,
      description: 'Data localization and cloud governance for banks and NBFCs'
    },
    {
      name: 'IRDAI Requirements',
      status: 'compliant',
      lastAudit: '2024-04-20',
      nextReview: '2024-07-20',
      cost: 45000,
      requirements: 12,
      implemented: 12,
      description: 'Insurance sector cloud and data protection requirements'
    },
    {
      name: 'PCI-DSS 4.0',
      status: 'in-progress',
      lastAudit: '2024-03-10',
      nextReview: '2024-09-10',
      cost: 42000,
      requirements: 18,
      implemented: 15,
      description: 'Payment card industry data security standards'
    },
    {
      name: 'DPDP Act',
      status: 'compliant',
      lastAudit: '2024-06-01',
      nextReview: '2024-09-01',
      cost: 32000,
      requirements: 10,
      implemented: 10,
      description: 'Digital Personal Data Protection Act compliance'
    },
    {
      name: 'MeitY Policy',
      status: 'compliant',
      lastAudit: '2024-05-01',
      nextReview: '2024-08-01',
      cost: 25000,
      requirements: 8,
      implemented: 8,
      description: 'Government cloud policy for empanelled CSPs'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            Compliance Cost Dashboard
          </h1>
          <p className="text-gray-600">Monitor compliance-related cloud spending and regulatory adherence</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCompliance}
            onChange={(e) => setSelectedCompliance(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Frameworks</option>
            <option value="mandatory">Mandatory Only</option>
            <option value="advisory">Advisory Only</option>
            <option value="rbi">RBI Guidelines</option>
            <option value="irdai">IRDAI Requirements</option>
            <option value="pci">PCI-DSS</option>
            <option value="dpdp">DPDP Act</option>
          </select>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                metric.status === 'good' ? 'bg-green-100 text-green-800' :
                metric.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {metric.status === 'good' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                 <AlertTriangle className="w-3 h-3 mr-1" />}
                {metric.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${
                  metric.trend === 'up' && metric.status === 'good' ? 'text-green-600' :
                  metric.trend === 'down' && metric.status !== 'good' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-500">Target: {metric.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Spend Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Spend Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceSpendData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complianceSpendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {complianceSpendData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    item.type === 'Mandatory' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Compliance Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Compliance Spend Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="RBI" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
                <Line type="monotone" dataKey="IRDAI" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
                <Line type="monotone" dataKey="PCI" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 4 }} />
                <Line type="monotone" dataKey="DPDP" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                <Line type="monotone" dataKey="MeitY" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Framework Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Framework Status</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">View Framework Guide</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {frameworkDetails.map((framework, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    framework.status === 'compliant' ? 'bg-green-100 text-green-800' :
                    framework.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {framework.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Monthly Cost:</span>
                    <span className="ml-1 font-medium">${framework.cost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Requirements:</span>
                    <span className="ml-1 font-medium">{framework.implemented}/{framework.requirements}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Audit:</span>
                    <span className="ml-1 font-medium">{framework.lastAudit}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Next Review:</span>
                    <span className="ml-1 font-medium">{framework.nextReview}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      framework.status === 'compliant' ? 'bg-green-500' :
                      framework.status === 'in-progress' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(framework.implemented / framework.requirements) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Alerts & Actions</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {complianceAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-400' :
                alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {alert.framework}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Resource: {alert.resource}</span>
                      <span>Cost Impact: {alert.cost}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      {alert.action}
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};