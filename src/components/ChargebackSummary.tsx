import React, { useState } from 'react';
import { Receipt, Download, Filter, TrendingUp, Building, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { User } from '../App';

interface ChargebackSummaryProps {
  user: User;
}

export const ChargebackSummary: React.FC<ChargebackSummaryProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('all');

  const businessUnits = [
    {
      id: 'retail-banking',
      name: 'Retail Banking',
      totalCost: 89500,
      growth: '+12.4%',
      services: {
        compute: 45000,
        storage: 18500,
        network: 12000,
        compliance: 14000
      },
      complianceTypes: ['PCI', 'PII'],
      manager: 'Sarah Johnson'
    },
    {
      id: 'corporate-banking',
      name: 'Corporate Banking',
      totalCost: 67300,
      growth: '+8.7%',
      services: {
        compute: 32000,
        storage: 15300,
        network: 9500,
        compliance: 10500
      },
      complianceTypes: ['PCI', 'SOC2'],
      manager: 'Michael Chen'
    },
    {
      id: 'insurance',
      name: 'Insurance Division',
      totalCost: 52800,
      growth: '+15.2%',
      services: {
        compute: 28000,
        storage: 12800,
        network: 6500,
        compliance: 5500
      },
      complianceTypes: ['IRDAI', 'PII'],
      manager: 'Jennifer Kim'
    },
    {
      id: 'analytics',
      name: 'Data Analytics',
      totalCost: 34200,
      growth: '+22.1%',
      services: {
        compute: 20000,
        storage: 8200,
        network: 3500,
        compliance: 2500
      },
      complianceTypes: ['PII', 'SOC2'],
      manager: 'David Rodriguez'
    }
  ];

  const monthlyTrend = [
    { month: 'Jan', retail: 78000, corporate: 62000, insurance: 45000, analytics: 28000 },
    { month: 'Feb', retail: 82000, corporate: 64000, insurance: 47000, analytics: 30000 },
    { month: 'Mar', retail: 85000, corporate: 65000, insurance: 49000, analytics: 32000 },
    { month: 'Apr', retail: 87000, corporate: 66000, insurance: 51000, analytics: 33000 },
    { month: 'May', retail: 88500, corporate: 67000, insurance: 52000, analytics: 34000 },
    { month: 'Jun', retail: 89500, corporate: 67300, insurance: 52800, analytics: 34200 },
  ];

  const serviceBreakdown = [
    { name: 'Compute', value: 125000, color: '#3B82F6' },
    { name: 'Storage', value: 54800, color: '#10B981' },
    { name: 'Network', value: 31500, color: '#F59E0B' },
    { name: 'Compliance', value: 32500, color: '#EF4444' },
  ];

  const reports = [
    {
      id: 1,
      name: 'June 2024 Chargeback Report',
      businessUnit: 'All Divisions',
      period: 'June 2024',
      totalAmount: '$243,800',
      status: 'ready',
      generatedAt: '2024-07-01 09:00 AM'
    },
    {
      id: 2,
      name: 'Q2 2024 Quarterly Summary',
      businessUnit: 'All Divisions',
      period: 'Q2 2024',
      totalAmount: '$710,400',
      status: 'ready',
      generatedAt: '2024-07-01 08:30 AM'
    },
    {
      id: 3,
      name: 'Retail Banking - June Detail',
      businessUnit: 'Retail Banking',
      period: 'June 2024',
      totalAmount: '$89,500',
      status: 'processing',
      generatedAt: '2024-07-01 10:15 AM'
    }
  ];

  const totalCost = businessUnits.reduce((sum, unit) => sum + unit.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Receipt className="w-8 h-8 text-blue-600 mr-3" />
            Chargeback Summary
          </h1>
          <p className="text-gray-600">Cost allocation and billing by business unit</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="current">Current Month</option>
            <option value="previous">Previous Month</option>
            <option value="quarter">Current Quarter</option>
            <option value="year">Year to Date</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Monthly Cost</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-100 rounded-lg">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{businessUnits.length}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{businessUnits.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Business Units</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">+14.6%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">$32.5K</h3>
            <p className="text-gray-600 text-sm mt-1">Compliance Costs</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Ready</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
            <p className="text-gray-600 text-sm mt-1">Reports Ready</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Unit Costs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost by Business Unit</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessUnits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                <Bar dataKey="totalCost" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Cost Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {serviceBreakdown.map((item, index) => (
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
      </div>

      {/* Business Unit Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Business Unit Details</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {businessUnits.map((unit) => (
              <div key={unit.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                      <span className={`text-sm font-medium ${
                        parseFloat(unit.growth.replace('%', '').replace('+', '')) > 15 ? 'text-red-600' :
                        parseFloat(unit.growth.replace('%', '').replace('+', '')) > 10 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {unit.growth}
                      </span>
                      <div className="flex space-x-1">
                        {unit.complianceTypes.map((type) => (
                          <span key={type} className={`px-2 py-1 text-xs rounded-full font-medium ${
                            type === 'PCI' ? 'bg-red-100 text-red-800' :
                            type === 'IRDAI' ? 'bg-orange-100 text-orange-800' :
                            type === 'PII' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Manager: {unit.manager}</p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Compute:</span>
                        <span className="ml-1 font-medium">${unit.services.compute.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Storage:</span>
                        <span className="ml-1 font-medium">${unit.services.storage.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Network:</span>
                        <span className="ml-1 font-medium">${unit.services.network.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Compliance:</span>
                        <span className="ml-1 font-medium">${unit.services.compliance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${unit.totalCost.toLocaleString()}</div>
                    <button className="mt-2 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Available Chargeback Reports</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.businessUnit} • {report.period}</p>
                    <p className="text-xs text-gray-500">Generated: {report.generatedAt}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{report.totalAmount}</div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'ready' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      report.status === 'ready' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={report.status !== 'ready'}
                  >
                    Download
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