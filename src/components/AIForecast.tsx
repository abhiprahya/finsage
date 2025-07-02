import React, { useState } from 'react';
import { TrendingUp, Brain, AlertTriangle, Calculator, Play, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import type { User } from '../App';

interface AIForecastProps {
  user: User;
}

export const AIForecast: React.FC<AIForecastProps> = ({ user }) => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [forecastPeriod, setForecastPeriod] = useState('6m');

  const forecastData = [
    { month: 'Jul 2024', actual: 178000, forecast: 165000, optimistic: 155000, pessimistic: 185000 },
    { month: 'Aug 2024', actual: null, forecast: 185000, optimistic: 170000, pessimistic: 205000 },
    { month: 'Sep 2024', actual: null, forecast: 192000, optimistic: 175000, pessimistic: 215000 },
    { month: 'Oct 2024', actual: null, forecast: 198000, optimistic: 180000, pessimistic: 225000 },
    { month: 'Nov 2024', actual: null, forecast: 205000, optimistic: 185000, pessimistic: 235000 },
    { month: 'Dec 2024', actual: null, forecast: 215000, optimistic: 195000, pessimistic: 250000 },
  ];

  const complianceForecast = [
    { category: 'PCI Compliance', current: 45000, forecast: 52000, growth: '+15.6%' },
    { category: 'IRDAI Requirements', current: 32000, forecast: 38000, growth: '+18.8%' },
    { category: 'PII Protection', current: 28000, forecast: 32000, growth: '+14.3%' },
    { category: 'SOC 2', current: 13000, forecast: 16000, growth: '+23.1%' },
  ];

  const scenarios = [
    { id: 'current', name: 'Current Trajectory', description: 'Based on existing usage patterns' },
    { id: 'optimized', name: 'Cost Optimized', description: 'With recommended optimizations applied' },
    { id: 'expansion', name: 'Business Expansion', description: '25% increase in workloads' },
    { id: 'migration', name: 'Cloud Migration', description: 'Additional on-premise migration' },
  ];

  const [whatIfInputs, setWhatIfInputs] = useState({
    newWorkloads: '',
    aiInstances: '',
    storageGrowth: '',
    complianceScope: ''
  });

  const forecastMetrics = [
    {
      title: 'Predicted 6M Spend',
      value: '$1.2M',
      confidence: '94%',
      change: '+18.4%',
      status: 'warning'
    },
    {
      title: 'Budget Breach Risk',
      value: '23%',
      confidence: '89%',
      change: '+5%',
      status: 'critical'
    },
    {
      title: 'Optimization Potential',
      value: '$45K',
      confidence: '92%',
      change: '-12%',
      status: 'good'
    },
    {
      title: 'Compliance Growth',
      value: '+16.8%',
      confidence: '87%',
      change: '+3%',
      status: 'warning'
    },
  ];

  const handleRunScenario = () => {
    // Simulate running AI forecast with what-if inputs
    console.log('Running scenario with inputs:', whatIfInputs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            AI Cost Forecasting
          </h1>
          <p className="text-gray-600">AI-powered cloud cost predictions and scenario planning</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="12m">12 Months</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Forecast</span>
          </button>
        </div>
      </div>

      {/* Forecast Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {forecastMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                metric.status === 'good' ? 'bg-green-100 text-green-800' :
                metric.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {metric.confidence} confidence
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm">
                <span className={`font-medium ${
                  metric.change.startsWith('+') && metric.status !== 'good' ? 'text-red-600' :
                  metric.change.startsWith('-') ? 'text-green-600' :
                  'text-orange-600'
                }`}>
                  {metric.change} vs current
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Forecast Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Cost Forecast</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                <Area
                  type="monotone"
                  dataKey="pessimistic"
                  stackId="1"
                  stroke="none"
                  fill="#FEE2E2"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stackId="1"
                  stroke="none"
                  fill="#DBEAFE"
                  fillOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Actual</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-blue-500 border-dashed rounded-full mr-2"></div>
              <span>AI Forecast</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-200 rounded-full mr-2"></div>
              <span>Confidence Range</span>
            </div>
          </div>
        </div>

        {/* Compliance Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Cost Forecast</h3>
          <div className="space-y-4">
            {complianceForecast.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.category}</h4>
                  <span className={`text-sm font-medium ${
                    parseFloat(item.growth.replace('%', '').replace('+', '')) > 20 ? 'text-red-600' :
                    parseFloat(item.growth.replace('%', '').replace('+', '')) > 15 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current: ${item.current.toLocaleString()}</span>
                  <span className="font-medium text-gray-900">Forecast: ${item.forecast.toLocaleString()}</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.current / item.forecast) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What-if Scenario Planning */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            What-if Scenario Planning
          </h2>
          <p className="text-gray-600 text-sm mt-1">Model different scenarios to understand cost impacts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Scenario Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Workloads</label>
                  <input
                    type="number"
                    value={whatIfInputs.newWorkloads}
                    onChange={(e) => setWhatIfInputs({...whatIfInputs, newWorkloads: e.target.value})}
                    placeholder="Number of instances"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">AI/ML Instances</label>
                  <input
                    type="number"
                    value={whatIfInputs.aiInstances}
                    onChange={(e) => setWhatIfInputs({...whatIfInputs, aiInstances: e.target.value})}
                    placeholder="GPU instances"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Growth (%)</label>
                  <input
                    type="number"
                    value={whatIfInputs.storageGrowth}
                    onChange={(e) => setWhatIfInputs({...whatIfInputs, storageGrowth: e.target.value})}
                    placeholder="e.g., 25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Scope</label>
                  <select
                    value={whatIfInputs.complianceScope}
                    onChange={(e) => setWhatIfInputs({...whatIfInputs, complianceScope: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select scope</option>
                    <option value="expand">Expand PCI scope</option>
                    <option value="new-region">New IRDAI region</option>
                    <option value="additional">Additional SOC 2</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleRunScenario}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Run AI Forecast</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Predefined Scenarios</h3>
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedScenario === scenario.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breach Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Predicted Budget Breach Alerts
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-red-900">High Risk: Q4 Budget Breach</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Current trajectory shows 23% probability of exceeding Q4 budget by $45,000
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    Primary drivers: PCI compliance expansion, increased AI workloads
                  </p>
                </div>
                <span className="text-red-600 font-semibold">23%</span>
              </div>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-orange-900">Medium Risk: IRDAI Compliance Overspend</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    IRDAI-tagged resources trending 18% above allocated budget
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    Recommendation: Implement automated scaling policies
                  </p>
                </div>
                <span className="text-orange-600 font-semibold">18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};