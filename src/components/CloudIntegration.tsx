import React, { useState } from 'react';
import { Cloud, Plus, Settings, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import type { User } from '../App';

interface CloudIntegrationProps {
  user: User;
}

interface CloudAccount {
  id: string;
  provider: 'AWS' | 'Azure' | 'GCP';
  accountName: string;
  accountId: string;
  status: 'connected' | 'error' | 'pending';
  lastSync: string;
  monthlySpend: number;
}

export const CloudIntegration: React.FC<CloudIntegrationProps> = ({ user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'AWS' | 'Azure' | 'GCP'>('AWS');
  const [accounts, setAccounts] = useState<CloudAccount[]>([
    {
      id: '1',
      provider: 'AWS',
      accountName: 'Production Account',
      accountId: '123456789012',
      status: 'connected',
      lastSync: '2024-01-15 10:30 AM',
      monthlySpend: 89000
    },
    {
      id: '2',
      provider: 'Azure',
      accountName: 'Development Environment',
      accountId: 'sub-987654321',
      status: 'connected',
      lastSync: '2024-01-15 10:25 AM',
      monthlySpend: 67000
    },
    {
      id: '3',
      provider: 'GCP',
      accountName: 'Analytics Project',
      accountId: 'project-analytics-001',
      status: 'error',
      lastSync: '2024-01-14 3:45 PM',
      monthlySpend: 22000
    }
  ]);

  const providers = [
    { name: 'AWS', icon: '🔶', description: 'Amazon Web Services' },
    { name: 'Azure', icon: '🔷', description: 'Microsoft Azure' },
    { name: 'GCP', icon: '🔴', description: 'Google Cloud Platform' },
  ];

  const complianceTags = [
    { name: 'PCI', description: 'Payment Card Industry compliance', color: 'red' },
    { name: 'IRDAI', description: 'Insurance Regulatory requirements', color: 'orange' },
    { name: 'PII', description: 'Personally Identifiable Information', color: 'purple' },
    { name: 'DR', description: 'Disaster Recovery resources', color: 'blue' },
    { name: 'Production', description: 'Production workloads', color: 'green' },
  ];

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate adding a new account
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cloud Integration</h1>
          <p className="text-gray-600">Manage your cloud provider connections and compliance settings</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Connected Cloud Accounts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {providers.find(p => p.name === account.provider)?.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{account.accountName}</h3>
                      <p className="text-sm text-gray-500">{account.provider} • {account.accountId}</p>
                      <p className="text-sm text-gray-500">Last sync: {account.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${account.monthlySpend.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Monthly spend</p>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                      {getStatusIcon(account.status)}
                      <span className="capitalize">{account.status}</span>
                    </span>
                    <button className="text-gray-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Tagging Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Compliance Tagging Configuration</h2>
          <p className="text-gray-600 text-sm mt-1">Configure automatic tagging rules for compliance tracking</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceTags.map((tag) => (
              <div key={tag.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    tag.color === 'red' ? 'bg-red-100 text-red-800' :
                    tag.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    tag.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                    tag.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {tag.name}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">{tag.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Cloud Account</h3>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cloud Provider</label>
                <div className="grid grid-cols-3 gap-2">
                  {providers.map((provider) => (
                    <button
                      key={provider.name}
                      type="button"
                      onClick={() => setSelectedProvider(provider.name as 'AWS' | 'Azure' | 'GCP')}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedProvider === provider.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{provider.icon}</div>
                      <div className="text-sm font-medium">{provider.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <input
                  type="text"
                  placeholder="e.g., Production Environment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedProvider === 'AWS' ? 'Access Key ID' : 
                   selectedProvider === 'Azure' ? 'Subscription ID' : 'Project ID'}
                </label>
                <input
                  type="text"
                  placeholder="Enter your credentials"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedProvider === 'AWS' ? 'Secret Access Key' : 
                   selectedProvider === 'Azure' ? 'Client Secret' : 'Service Account Key'}
                </label>
                <input
                  type="password"
                  placeholder="Enter your secret"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Connect Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};