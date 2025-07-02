import React from 'react';
import { DollarSign, TrendingUp, Shield, AlertTriangle, Cloud, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import type { User } from '../App';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const spendData = [
    { name: 'PCI Compliance', value: 45000, color: '#EF4444' },
    { name: 'IRDAI Requirements', value: 32000, color: '#F59E0B' },
    { name: 'General Workloads', value: 23000, color: '#10B981' },
    { name: 'DR & Backup', value: 18000, color: '#3B82F6' },
  ];

  const trendData = [
    { month: 'Jan', spend: 95000, forecast: 98000 },
    { month: 'Feb', spend: 105000, forecast: 108000 },
    { month: 'Mar', spend: 118000, forecast: 115000 },
    { month: 'Apr', spend: 142000, forecast: 125000 },
    { month: 'May', spend: 156000, forecast: 135000 },
    { month: 'Jun', spend: 178000, forecast: 165000 },
  ];

  const cloudProviderData = [
    { name: 'AWS', spend: 89000 },
    { name: 'Azure', spend: 67000 },
    { name: 'GCP', spend: 22000 },
  ];

  const stats = [
    {
      title: 'Total Cloud Spend',
      value: '$178,000',
      change: '+12.4%',
      changeType: 'increase' as const,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Compliance Costs',
      value: '$77,000',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: <Shield className="w-6 h-6" />,
      color: 'red'
    },
    {
      title: 'Cost Optimization',
      value: '$23,400',
      change: '-15.3%',
      changeType: 'decrease' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'Active Alerts',
      value: '7',
      change: '+2',
      changeType: 'increase' as const,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'orange'
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'PCI Compliance Budget Exceeded',
      message: 'PCI-tagged resources exceeded budget by 15% this month',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Cost Optimization Opportunity',
      message: 'Identified $5,400/month savings in unused RDS instances',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'critical',
      title: 'IRDAI Compliance Alert',
      message: 'New IRDAI-tagged resources deployed without approval',
      time: '6 hours ago'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'red' ? 'bg-red-100 text-red-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-red-600' : 'text-green-600'
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
        {/* Spend by Compliance Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend by Compliance Category</h3>
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
          <div className="mt-4 grid grid-cols-2 gap-4">
            {spendData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
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
                  name="Actual Spend"
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

        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-400' :
                alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-4">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};