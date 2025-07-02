import React, { useState } from 'react';
import { Scale, AlertTriangle, TrendingUp, Calculator, FileText, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import type { User } from '../App';

interface RegulatoryImpactProps {
  user: User;
}

export const RegulatoryImpact: React.FC<RegulatoryImpactProps> = ({ user }) => {
  const [selectedRegulation, setSelectedRegulation] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState('current');

  const regulations = [
    { id: 'rbi', name: 'RBI Guidelines', description: 'Reserve Bank of India data localization and security requirements' },
    { id: 'irdai', name: 'IRDAI Regulations', description: 'Insurance Regulatory and Development Authority requirements' },
    { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standards' },
    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation compliance' },
    { id: 'sebi', name: 'SEBI Guidelines', description: 'Securities and Exchange Board of India requirements' },
  ];

  const impactData = [
    { regulation: 'RBI Data Localization', currentCost: 45000, projectedCost: 78000, impact: '+73%', timeline: '6 months' },
    { regulation: 'IRDAI Cloud Security', currentCost: 32000, projectedCost: 48000, impact: '+50%', timeline: '3 months' },
    { regulation: 'PCI DSS v4.0', currentCost: 28000, projectedCost: 42000, impact: '+50%', timeline: '12 months' },
    { regulation: 'GDPR Enhancement', currentCost: 15000, projectedCost: 22000, impact: '+47%', timeline: '9 months' },
    { regulation: 'SEBI Cybersecurity', currentCost: 12000, projectedCost: 18000, impact: '+50%', timeline: '4 months' },
  ];

  const timelineData = [
    { month: 'Current', rbi: 45000, irdai: 32000, pci: 28000, gdpr: 15000, sebi: 12000 },
    { month: 'Month 3', rbi: 52000, irdai: 48000, pci: 30000, gdpr: 16000, sebi: 12000 },
    { month: 'Month 6', rbi: 78000, irdai: 48000, pci: 32000, gdpr: 18000, sebi: 15000 },
    { month: 'Month 9', rbi: 78000, irdai: 48000, pci: 36000, gdpr: 22000, sebi: 15000 },
    { month: 'Month 12', rbi: 78000, irdai: 48000, pci: 42000, gdpr: 22000, sebi: 18000 },
  ];

  const scenarios = [
    {
      id: 'aggressive',
      name: 'Aggressive Compliance',
      description: 'Implement all requirements ahead of deadlines',
      costMultiplier: 1.3,
      timeReduction: '40%'
    },
    {
      id: 'standard',
      name: 'Standard Timeline',
      description: 'Follow regulatory timelines exactly',
      costMultiplier: 1.0,
      timeReduction: '0%'
    },
    {
      id: 'minimal',
      name: 'Minimal Compliance',
      description: 'Meet only mandatory requirements',
      costMultiplier: 0.8,
      timeReduction: '-20%'
    }
  ];

  const upcomingRegulations = [
    {
      id: 1,
      title: 'RBI Cloud Guidelines Update',
      description: 'Enhanced data residency and audit requirements',
      effectiveDate: '2024-12-01',
      estimatedImpact: '$35,000/month',
      priority: 'high',
      preparationTime: '6 months'
    },
    {
      id: 2,
      title: 'IRDAI Digital Security Framework',
      description: 'New cybersecurity standards for insurance companies',
      effectiveDate: '2025-03-01',
      estimatedImpact: '$28,000/month',
      priority: 'medium',
      preparationTime: '9 months'
    },
    {
      id: 3,
      title: 'PCI DSS v4.0 Mandatory',
      description: 'Transition from v3.2.1 becomes mandatory',
      effectiveDate: '2025-03-31',
      estimatedImpact: '$15,000/month',
      priority: 'high',
      preparationTime: '8 months'
    }
  ];

  const totalCurrentCost = impactData.reduce((sum, item) => sum + item.currentCost, 0);
  const totalProjectedCost = impactData.reduce((sum, item) => sum + item.projectedCost, 0);
  const totalIncrease = ((totalProjectedCost - totalCurrentCost) / totalCurrentCost * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Scale className="w-8 h-8 text-blue-600 mr-3" />
            Regulatory Impact Analysis
          </h1>
          <p className="text-gray-600">Model cost impact of regulatory changes and compliance requirements</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Regulations</option>
            {regulations.map((reg) => (
              <option key={reg.id} value={reg.id}>{reg.name}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Analysis</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-red-600">+{totalIncrease}%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">${totalProjectedCost.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Total Projected Cost</p>
            <p className="text-xs text-gray-500">vs ${totalCurrentCost.toLocaleString()} current</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">{upcomingRegulations.length}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{upcomingRegulations.filter(r => r.priority === 'high').length}</h3>
            <p className="text-gray-600 text-sm">High Priority Changes</p>
            <p className="text-xs text-gray-500">Next 12 months</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">6 months</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">$78K</h3>
            <p className="text-gray-600 text-sm">Peak Monthly Impact</p>
            <p className="text-xs text-gray-500">RBI Data Localization</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Active</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{regulations.length}</h3>
            <p className="text-gray-600 text-sm">Tracked Regulations</p>
            <p className="text-xs text-gray-500">Across all frameworks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Impact Timeline</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="rbi" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
                <Area type="monotone" dataKey="irdai" stackId="1" stroke="#F59E0B" fill="#FEF3C7" />
                <Area type="monotone" dataKey="pci" stackId="1" stroke="#8B5CF6" fill="#EDE9FE" />
                <Area type="monotone" dataKey="gdpr" stackId="1" stroke="#10B981" fill="#D1FAE5" />
                <Area type="monotone" dataKey="sebi" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regulation Impact Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Impact by Regulation</h3>
          <div className="space-y-4">
            {impactData.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.regulation}</h4>
                  <span className={`text-sm font-medium ${
                    parseFloat(item.impact.replace('%', '').replace('+', '')) > 60 ? 'text-red-600' :
                    parseFloat(item.impact.replace('%', '').replace('+', '')) > 40 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {item.impact}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Current: ${item.currentCost.toLocaleString()}</span>
                  <span className="font-medium text-gray-900">Projected: ${item.projectedCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Timeline: {item.timeline}</span>
                  <span>Impact: +${(item.projectedCost - item.currentCost).toLocaleString()}</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.currentCost / item.projectedCost) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Planning */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Compliance Scenario Planning</h2>
          <p className="text-gray-600 text-sm mt-1">Model different compliance approaches and their cost implications</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-6 text-left border rounded-lg transition-colors ${
                  selectedScenario === scenario.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{scenario.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost Multiplier:</span>
                    <span className="font-medium">{scenario.costMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time Impact:</span>
                    <span className="font-medium">{scenario.timeReduction}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Regulatory Changes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Regulatory Changes</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingRegulations.map((regulation) => (
              <div key={regulation.id} className={`p-4 rounded-lg border-l-4 ${
                regulation.priority === 'high' ? 'bg-red-50 border-red-400' :
                'bg-orange-50 border-orange-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{regulation.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        regulation.priority === 'high' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {regulation.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{regulation.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Effective:</span> {regulation.effectiveDate}
                      </div>
                      <div>
                        <span className="font-medium">Impact:</span> {regulation.estimatedImpact}
                      </div>
                      <div>
                        <span className="font-medium">Prep Time:</span> {regulation.preparationTime}
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    Plan Response
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