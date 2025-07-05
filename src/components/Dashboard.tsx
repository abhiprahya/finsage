import React from 'react';
import { DollarSign, TrendingUp, Shield, AlertTriangle, Cloud, Users, BookOpen, Scale } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import type { User } from '../App';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const spendData = [
    { name: 'RBI Compliance', value: 78000, color: '#EF4444' },
    { name: 'IRDAI Requirements', value: 45000, color: '#F59E0B' },
    { name: 'PCI-DSS', value: 42000, color: '#8B5CF6' },
    { name: 'DPDP Act', value: 32000, color: '#10B981' },
    { name: 'MeitY Policy', value: 25000, color: '#3B82F6' },
    { name: 'General Workloads', value: 23000, color: '#6B7280' },
  ];

  const trendData = [
    { month: 'Jan', spend: 195000, forecast: 198000, compliance: 165000 },
    { month: 'Feb', spend: 215000, forecast: 218000, compliance: 178000 },
    { month: 'Mar', spend: 235000, forecast: 225000, compliance: 195000 },
    { month: 'Apr', spend: 252000, forecast: 245000, compliance: 210000 },
    { month: 'May', spend: 268000, forecast: 265000, compliance: 225000 },
    { month: 'Jun', spend: 285000, forecast: 275000, compliance: 240000 },
  ];

  const cloudProviderData = [
    { name: 'AWS', spend: 145000, compliance: 95000 },
    { name: 'Azure', span: 89000, compliance: 58000 },
    { name: 'GCP', spend: 51000, compliance: 32000 },
  ];

  const complianceFrameworks = [
    { name: 'RBI Guidelines', status: 'compliant', cost: 78000, nextReview: '2024-08-20' },
    { name: 'IRDAI Requirements', status: 'compliant', cost: 45000, nextReview: '2024-09-15' },
    { name: 'PCI-DSS 4.0', status: 'in-progress', cost: 42000, nextReview: '2025-03-31' },
    { name: 'DPDP Act', status: 'compliant', cost: 32000, nextReview: '2024-10-01' },
    { name: 'MeitY Policy', status: 'compliant', cost: 25000, nextReview: '2024-07-10' },
  ];

  const stats = [
    {
      title: 'Total Cloud Spend',
      value: '$285,000',
      change: '+14.2%',
      changeType: 'increase' as const,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Compliance Costs',
      value: '$222,000',
      change: '+12.8%',
      changeType: 'increase' as const,
      icon: <Shield className="w-6 h-6" />,
      color: 'red'
    },
    {
      title: 'Cost Optimization',
      value: '$38,400',
      change: '-18.3%',
      changeType: 'decrease' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'Active Frameworks',
      value: '8',
      change: '+1',
      changeType: 'increase' as const,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'purple'
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'RBI Compliance Budget Exceeded',
      message: 'RBI-tagged resources exceeded budget by 18% this month',
      time: '2 hours ago',
      framework: 'RBI Guidelines'
    },
    {
      id: 2,
      type: 'warning',
      title: 'PCI-DSS 4.0 Transition Required',
      message: 'Mandatory transition deadline approaching in 8 months',
      time: '4 hours ago',
      framework: 'PCI-DSS'
    },
    {
      id: 3,
      type: 'info',
      title: 'IRDAI Cost Optimization Opportunity',
      message: 'Identified $8,200/month savings in IRDAI-tagged resources',
      time: '6 hours ago',
      framework: 'IRDAI'
    },
    {
      id: 4,
      type: 'warning',
      title: 'DPDP Act Compliance Review Due',
      message: 'Quarterly compliance review scheduled for next week',
      time: '1 day ago',
      framework: 'DPDP Act'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="text-blue-100">
          {user.role === 'CFO' ? 'Monitor your compliance costs and financial performance across all frameworks.' :
           user.role === 'Compliance Officer' ? 'Track compliance status and regulatory requirements across all frameworks.' :
           user.role === 'FinOps Analyst' ? 'Optimize cloud costs while maintaining compliance across all regulations.' :
           user.role === 'CISO' ? 'Oversee security compliance and risk management across all frameworks.' :
           'Manage cloud infrastructure with compliance-aware cost optimization.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' && stat.color !== 'green' ? 'text-red-600' : 
                stat.changeType === 'decrease' && stat.color === 'green' ? 'text-green-600' :
                stat.changeType === 'increase' && stat.color === 'purple' ? 'text-purple-600' :
                'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Compliance Framework */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend by Compliance Framework</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {spendData.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spend Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend Trend vs Forecast</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Total Spend"
                />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  name="Compliance Spend"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="AI Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cloud Provider Spend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cloud Provider Spend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudProviderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']} />
                <Bar dataKey="spend" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Framework Status</h3>
          <div className="space-y-3">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${
                    framework.status === 'compliant' ? 'bg-green-500' :
                    framework.status === 'in-progress' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}></span>
                  <div>
                    <h4 className="font-medium text-gray-900">{framework.name}</h4>
                    <p className="text-sm text-gray-500">Next review: {framework.nextReview}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${framework.cost.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    framework.status === 'compliant' ? 'bg-green-100 text-green-800' :
                    framework.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {framework.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'critical' ? 'bg-red-50 border-red-400' :
              alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
              'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {alert.framework}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500 ml-4">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};