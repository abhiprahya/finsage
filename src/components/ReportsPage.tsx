import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Eye, Share } from 'lucide-react';
import type { User } from '../App';

interface ReportsPageProps {
  user: User;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      id: 1,
      name: 'Cloud Cost Summary - June 2024',
      category: 'cost',
      type: 'PDF',
      size: '2.4 MB',
      generatedDate: '2024-07-01',
      description: 'Comprehensive overview of cloud spending across all business units',
      status: 'ready',
      metrics: {
        totalPages: 24,
        charts: 12,
        tables: 8
      }
    },
    {
      id: 2,
      name: 'Compliance Audit Report - Q2 2024',
      category: 'compliance',
      type: 'PDF',
      size: '5.8 MB',
      generatedDate: '2024-07-01',
      description: 'Detailed compliance status for PCI, IRDAI, and SOC 2 requirements',
      status: 'ready',
      metrics: {
        totalPages: 45,
        charts: 18,
        tables: 15
      }
    },
    {
      id: 3,
      name: 'FinOps Executive Dashboard - June 2024',
      category: 'executive',
      type: 'PDF',
      size: '1.2 MB',
      generatedDate: '2024-07-01',
      description: 'High-level financial operations summary for leadership',
      status: 'ready',
      metrics: {
        totalPages: 8,
        charts: 6,
        tables: 3
      }
    },
    {
      id: 4,
      name: 'AI Forecast Analysis - July 2024',
      category: 'forecast',
      type: 'PDF',
      size: '3.1 MB',
      generatedDate: '2024-07-02',
      description: 'AI-powered cost predictions and scenario analysis',
      status: 'processing',
      metrics: {
        totalPages: 32,
        charts: 20,
        tables: 10
      }
    },
    {
      id: 5,
      name: 'Business Unit Chargeback - June 2024',
      category: 'chargeback',
      type: 'Excel',
      size: '890 KB',
      generatedDate: '2024-07-01',
      description: 'Detailed cost allocation per business unit with drill-down data',
      status: 'ready',
      metrics: {
        totalPages: 12,
        charts: 8,
        tables: 20
      }
    },
    {
      id: 6,
      name: 'Security & Compliance Scorecard',
      category: 'compliance',
      type: 'PDF',
      size: '1.8 MB',
      generatedDate: '2024-06-30',
      description: 'Monthly security posture and compliance score assessment',
      status: 'ready',
      metrics: {
        totalPages: 16,
        charts: 10,
        tables: 6
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Reports', count: reports.length },
    { id: 'cost', name: 'Cost Reports', count: reports.filter(r => r.category === 'cost').length },
    { id: 'compliance', name: 'Compliance', count: reports.filter(r => r.category === 'compliance').length },
    { id: 'executive', name: 'Executive', count: reports.filter(r => r.category === 'executive').length },
    { id: 'forecast', name: 'Forecasting', count: reports.filter(r => r.category === 'forecast').length },
    { id: 'chargeback', name: 'Chargeback', count: reports.filter(r => r.category === 'chargeback').length }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Cost Summary',
      frequency: 'Weekly',
      nextRun: '2024-07-08',
      enabled: true,
      recipients: ['sarah.johnson@company.com', 'finops-team@company.com']
    },
    {
      id: 2,
      name: 'Monthly Compliance Report',
      frequency: 'Monthly',
      nextRun: '2024-08-01',
      enabled: true,
      recipients: ['ciso@company.com', 'compliance-team@company.com']
    },
    {
      id: 3,
      name: 'Quarterly Executive Summary',
      frequency: 'Quarterly',
      nextRun: '2024-10-01',
      enabled: false,
      recipients: ['cfo@company.com', 'executive-team@company.com']
    }
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cost': return 'bg-blue-100 text-blue-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'executive': return 'bg-purple-100 text-purple-800';
      case 'forecast': return 'bg-green-100 text-green-800';
      case 'chargeback': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600">Access and manage your financial operations reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{category.name}</span>
              <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>Generated: {report.generatedDate}</span>
                    <span>Size: {report.size}</span>
                    <span>Type: {report.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                  {report.category}
                </span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-900">{report.metrics.totalPages}</div>
                <div className="text-gray-600">Pages</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-900">{report.metrics.charts}</div>
                <div className="text-gray-600">Charts</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-900">{report.metrics.tables}</div>
                <div className="text-gray-600">Tables</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
              <button 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  report.status === 'ready' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={report.status !== 'ready'}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Scheduled Reports</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Add Schedule</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {scheduledReports.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{schedule.name}</h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {schedule.enabled ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Frequency: {schedule.frequency}</span>
                    <span>Next run: {schedule.nextRun}</span>
                    <span>Recipients: {schedule.recipients.length}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    Edit
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={schedule.enabled}
                      onChange={() => {}}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Custom Report</h3>
              <p className="text-sm text-gray-600">Build a custom report with specific metrics</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600">Export raw data for external analysis</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Schedule Report</h3>
              <p className="text-sm text-gray-600">Set up automated report delivery</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};