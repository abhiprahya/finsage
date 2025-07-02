import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Filter, Download, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import type { User } from '../App';

interface ComplianceDashboardProps {
  user: User;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ user }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCompliance, setSelectedCompliance] = useState('all');

  const complianceSpendData = [
    { name: 'PCI Compliance', value: 45000, color: '#EF4444', percentage: 38 },
    { name: 'IRDAI Requirements', value: 32000, color: '#F59E0B', percentage: 27 },
    { name: 'PII Protection', value: 28000, color: '#8B5CF6', percentage: 24 },
    { name: 'SOC 2', value: 13000, color: '#06B6D4', percentage: 11 },
  ];

  const monthlyComplianceData = [
    { month: 'Jan', PCI: 38000, IRDAI: 28000, PII: 22000, SOC2: 10000 },
    { month: 'Feb', PCI: 42000, IRDAI: 30000, PII: 24000, SOC2: 11000 },
    { month: 'Mar', PCI: 45000, IRDAI: 32000, PII: 28000, SOC2: 13000 },
    { month: 'Apr', PCI: 48000, IRDAI: 35000, PII: 30000, SOC2: 14000 },
    { month: 'May', PCI: 52000, IRDAI: 38000, PII: 32000, SOC2: 15000 },
    { month: 'Jun', PCI: 55000, IRDAI: 40000, PII: 35000, SOC2: 16000 },
  ];

  const complianceAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'PCI Compliance Breach Risk',
      description: 'Unencrypted RDS instance detected in PCI environment',
      resource: 'rds-prod-payments-001',
      time: '15 minutes ago',
      cost: '$2,400/month'
    },
    {
      id: 2,
      type: 'warning',
      title: 'IRDAI Data Residency Violation',
      description: 'Resources deployed outside approved Indian regions',
      resource: 'ec2-analytics-cluster',
      time: '2 hours ago',
      cost: '$3,200/month'
    },
    {
      id: 3,
      type: 'info',
      title: 'SOC 2 Logging Insufficient',
      description: 'CloudTrail logs retention below compliance requirement',
      resource: 'cloudtrail-audit-logs',
      time: '4 hours ago',
      cost: '$150/month'
    },
  ];

  const complianceMetrics = [
    {
      title: 'Total Compliance Spend',
      value: '$118,000',
      change: '+8.4%',
      trend: 'up',
      target: '$125,000',
      status: 'good'
    },
    {
      title: 'Policy Violations',
      value: '3',
      change: '-2',
      trend: 'down',
      target: '0',
      status: 'warning'
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      target: '98%',
      status: 'good'
    },
    {
      title: 'At-Risk Resources',
      value: '12',
      change: '+3',
      trend: 'up',
      target: '0',
      status: 'critical'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Cost Dashboard</h1>
          <p className="text-gray-600">Monitor compliance-related cloud spending and violations</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCompliance}
            onChange={(e) => setSelectedCompliance(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Compliance Types</option>
            <option value="pci">PCI Compliance</option>
            <option value="irdai">IRDAI Requirements</option>
            <option value="pii">PII Protection</option>
            <option value="soc2">SOC 2</option>
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
                 metric.status === 'warning' ? <AlertTriangle className="w-3 h-3 mr-1" /> :
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
                <Line type="monotone" dataKey="PCI" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
                <Line type="monotone" dataKey="IRDAI" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
                <Line type="monotone" dataKey="PII" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 4 }} />
                <Line type="monotone" dataKey="SOC2" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Alerts</h2>
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
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Resource: {alert.resource}</span>
                      <span>Cost Impact: {alert.cost}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};