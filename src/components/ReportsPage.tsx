import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Eye, Share, Upload, Search, Users, Building, Globe, Shield } from 'lucide-react';
import type { User } from '../App';

interface ReportsPageProps {
  user: User;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

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
      account: 'HDFC Bank Ltd.',
      compliance: ['RBI', 'PCI'],
      country: 'India',
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
      account: 'HDFC Bank Ltd.',
      compliance: ['PCI', 'IRDAI', 'SOC2'],
      country: 'India',
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
      account: 'HDFC Bank Ltd.',
      compliance: ['RBI'],
      country: 'India',
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
      account: 'HDFC Bank Ltd.',
      compliance: ['RBI', 'DPDP'],
      country: 'India',
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
      account: 'HDFC Bank Ltd.',
      compliance: ['RBI'],
      country: 'India',
      metrics: {
        totalPages: 12,
        charts: 8,
        tables: 20
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

  const accounts = [
    { id: 'all', name: 'All Accounts' },
    { id: 'hdfc', name: 'HDFC Bank Ltd.' },
    { id: 'icici', name: 'ICICI Bank Ltd.' },
    { id: 'axis', name: 'Axis Bank Ltd.' },
    { id: 'sbi', name: 'State Bank of India' }
  ];

  const complianceFilters = [
    { id: 'all', name: 'All Compliance' },
    { id: 'rbi', name: 'RBI Guidelines' },
    { id: 'pci', name: 'PCI-DSS' },
    { id: 'irdai', name: 'IRDAI' },
    { id: 'dpdp', name: 'DPDP Act' },
    { id: 'soc2', name: 'SOC 2' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = selectedAccount === 'all' || report.account.toLowerCase().includes(selectedAccount);
    const matchesCompliance = selectedCompliance === 'all' || 
                             report.compliance.some(c => c.toLowerCase().includes(selectedCompliance));
    
    return matchesCategory && matchesSearch && matchesAccount && matchesCompliance;
  });

  const handleDownload = (reportId: number, format: string) => {
    console.log(`Downloading report ${reportId} as ${format}`);
    // Simulate download
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Uploading files:', Array.from(files).map(f => f.name));
      setShowUploadModal(false);
    }
  };

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
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {accounts.map(account => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>

          <select
            value={selectedCompliance}
            onChange={(e) => setSelectedCompliance(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {complianceFilters.map(filter => (
              <option key={filter.id} value={filter.id}>{filter.name}</option>
            ))}
          </select>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
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

            {/* Report Metadata */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{report.account}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{report.country}</span>
              </div>
            </div>

            {/* Compliance Tags */}
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-4 h-4 text-gray-400" />
              <div className="flex space-x-1">
                {report.compliance.map((comp) => (
                  <span key={comp} className={`px-2 py-1 text-xs rounded-full font-medium ${
                    comp === 'PCI' ? 'bg-red-100 text-red-800' :
                    comp === 'RBI' ? 'bg-blue-100 text-blue-800' :
                    comp === 'IRDAI' ? 'bg-orange-100 text-orange-800' :
                    comp === 'DPDP' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {comp}
                  </span>
                ))}
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
              
              {/* Download Options */}
              <div className="relative group">
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
                
                {report.status === 'ready' && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      onClick={() => handleDownload(report.id, 'pdf')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download as PDF
                    </button>
                    <button
                      onClick={() => handleDownload(report.id, 'excel')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download as Excel
                    </button>
                    <button
                      onClick={() => handleDownload(report.id, 'csv')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download as CSV
                    </button>
                    <button
                      onClick={() => handleDownload(report.id, 'docx')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download as Word
                    </button>
                    <button
                      onClick={() => handleDownload(report.id, 'zip')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Download as ZIP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="cost">Cost Report</option>
                  <option value="compliance">Compliance Report</option>
                  <option value="executive">Executive Summary</option>
                  <option value="forecast">Forecast Analysis</option>
                  <option value="chargeback">Chargeback Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="hdfc">HDFC Bank Ltd.</option>
                  <option value="icici">ICICI Bank Ltd.</option>
                  <option value="axis">Axis Bank Ltd.</option>
                  <option value="sbi">State Bank of India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Files</label>
                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Choose files to upload</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV, Word, ZIP files supported</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept=".pdf,.xlsx,.xls,.csv,.docx,.doc,.zip"
                  />
                </label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};