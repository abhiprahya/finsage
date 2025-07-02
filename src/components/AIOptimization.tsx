import React, { useState } from 'react';
import { Cpu, Zap, TrendingDown, Settings, Play, Download, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import type { User } from '../App';

interface AIOptimizationProps {
  user: User;
}

export const AIOptimization: React.FC<AIOptimizationProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const optimizationOpportunities = [
    {
      id: 1,
      title: 'Right-size GPU Instances',
      category: 'compute',
      description: 'ML training instances are over-provisioned by 40%',
      currentCost: 15000,
      potentialSavings: 6000,
      savingsPercentage: 40,
      effort: 'low',
      complianceImpact: 'none',
      resources: ['ml-training-cluster-01', 'ml-training-cluster-02'],
      priority: 'high'
    },
    {
      id: 2,
      title: 'Optimize AI Model Storage',
      category: 'storage',
      description: 'Unused model versions consuming 2.5TB of premium storage',
      currentCost: 8500,
      potentialSavings: 3200,
      savingsPercentage: 38,
      effort: 'medium',
      complianceImpact: 'low',
      resources: ['model-storage-bucket', 'training-data-lake'],
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Implement Auto-scaling for Inference',
      category: 'compute',
      description: 'AI inference endpoints idle 60% of the time',
      currentCost: 12000,
      potentialSavings: 4800,
      savingsPercentage: 40,
      effort: 'high',
      complianceImpact: 'medium',
      resources: ['inference-api-cluster', 'model-serving-nodes'],
      priority: 'high'
    },
    {
      id: 4,
      title: 'Consolidate Development Environments',
      category: 'compute',
      description: 'Multiple underutilized AI development environments',
      currentCost: 6000,
      potentialSavings: 2400,
      savingsPercentage: 40,
      effort: 'medium',
      complianceImpact: 'none',
      resources: ['dev-ml-env-01', 'dev-ml-env-02', 'dev-ml-env-03'],
      priority: 'low'
    },
    {
      id: 5,
      title: 'Optimize Data Pipeline Scheduling',
      category: 'compute',
      description: 'ETL jobs running during peak hours unnecessarily',
      currentCost: 4500,
      potentialSavings: 1350,
      savingsPercentage: 30,
      effort: 'low',
      complianceImpact: 'low',
      resources: ['data-pipeline-cluster'],
      priority: 'medium'
    }
  ];

  const utilizationData = [
    { resource: 'GPU Cluster A', utilization: 45, cost: 15000, optimal: 80 },
    { resource: 'GPU Cluster B', utilization: 62, cost: 12000, optimal: 80 },
    { resource: 'Inference Nodes', utilization: 35, cost: 8000, optimal: 70 },
    { resource: 'Training Storage', utilization: 78, cost: 5000, optimal: 85 },
    { resource: 'Data Pipeline', utilization: 55, cost: 4500, optimal: 75 },
  ];

  const savingsTimelineData = [
    { month: 'Month 1', implemented: 2400, projected: 2400 },
    { month: 'Month 2', implemented: 4800, projected: 5600 },
    { month: 'Month 3', implemented: 7200, projected: 8800 },
    { month: 'Month 4', implemented: 9600, projected: 12000 },
    { month: 'Month 5', implemented: 12000, projected: 15200 },
    { month: 'Month 6', implemented: 14400, projected: 17750 },
  ];

  const categoryBreakdown = [
    { name: 'Compute Optimization', value: 13200, color: '#3B82F6' },
    { name: 'Storage Optimization', value: 3200, color: '#10B981' },
    { name: 'Network Optimization', value: 800, color: '#F59E0B' },
    { name: 'Scheduling Optimization', value: 1350, color: '#8B5CF6' },
  ];

  const aiWorkloads = [
    {
      name: 'Credit Risk ML Models',
      type: 'Training',
      instances: 8,
      utilization: 45,
      cost: 15000,
      compliance: ['PCI', 'RBI'],
      optimization: 'High'
    },
    {
      name: 'Fraud Detection API',
      type: 'Inference',
      instances: 12,
      utilization: 35,
      cost: 8000,
      compliance: ['PCI'],
      optimization: 'High'
    },
    {
      name: 'Customer Analytics',
      type: 'Batch Processing',
      instances: 6,
      utilization: 78,
      cost: 5000,
      compliance: ['PII'],
      optimization: 'Low'
    },
    {
      name: 'Risk Assessment Engine',
      type: 'Real-time',
      instances: 4,
      utilization: 62,
      cost: 6500,
      compliance: ['RBI', 'IRDAI'],
      optimization: 'Medium'
    }
  ];

  const totalPotentialSavings = optimizationOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0);
  const totalCurrentCost = optimizationOpportunities.reduce((sum, opp) => sum + opp.currentCost, 0);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Cpu className="w-8 h-8 text-blue-600 mr-3" />
            AI Infrastructure Optimization
          </h1>
          <p className="text-gray-600">Optimize AI/ML workloads for cost efficiency and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="compute">Compute</option>
            <option value="storage">Storage</option>
            <option value="network">Network</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              {((totalPotentialSavings / totalCurrentCost) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">${totalPotentialSavings.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Monthly Savings Potential</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{aiWorkloads.length}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">52%</h3>
            <p className="text-gray-600 text-sm">Average AI Utilization</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">
              {optimizationOpportunities.filter(o => o.priority === 'high').length}
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{optimizationOpportunities.length}</h3>
            <p className="text-gray-600 text-sm">Optimization Opportunities</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Active</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
            <p className="text-gray-600 text-sm">Auto-scaling Policies</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Utilization */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Resource Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resource" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#3B82F6" name="Current %" />
                <Bar dataKey="optimal" fill="#10B981" name="Optimal %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Potential Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryBreakdown.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Workloads Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">AI Workloads Overview</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Workload</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Instances</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Utilization</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Monthly Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Compliance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Optimization</th>
                </tr>
              </thead>
              <tbody>
                {aiWorkloads.map((workload, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{workload.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{workload.type}</td>
                    <td className="py-3 px-4 text-gray-600">{workload.instances}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              workload.utilization < 50 ? 'bg-red-500' :
                              workload.utilization < 70 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${workload.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{workload.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">${workload.cost.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        {workload.compliance.map((comp) => (
                          <span key={comp} className={`px-2 py-1 text-xs rounded-full font-medium ${
                            comp === 'PCI' ? 'bg-red-100 text-red-800' :
                            comp === 'RBI' ? 'bg-blue-100 text-blue-800' :
                            comp === 'IRDAI' ? 'bg-orange-100 text-orange-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        workload.optimization === 'High' ? 'bg-red-100 text-red-800' :
                        workload.optimization === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {workload.optimization}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Optimization Opportunities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {optimizationOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(opportunity.priority)}`}>
                        {opportunity.priority} priority
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(opportunity.effort)}`}>
                        {opportunity.effort} effort
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Current Cost:</span>
                        <span className="ml-1 font-medium">${opportunity.currentCost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Potential Savings:</span>
                        <span className="ml-1 font-medium text-green-600">${opportunity.potentialSavings.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Savings %:</span>
                        <span className="ml-1 font-medium">{opportunity.savingsPercentage}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Compliance Impact:</span>
                        <span className="ml-1 font-medium">{opportunity.complianceImpact}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Affected Resources:</span> {opportunity.resources.join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Implement</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Configure</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projected Savings Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Projected Savings Timeline</h2>
        </div>
        <div className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="implemented" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Implemented Savings"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Projected Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};