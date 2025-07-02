import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Save, TestTube as Test } from 'lucide-react';
import type { User } from '../App';

interface NotificationSettingsProps {
  user: User;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ user }) => {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      address: user.email,
      budgetAlerts: true,
      complianceViolations: true,
      costOptimization: false,
      weeklyReports: true,
      threshold: 85
    },
    slack: {
      enabled: false,
      webhookUrl: '',
      channel: '#finops-alerts',
      budgetAlerts: true,
      complianceViolations: true,
      costOptimization: false,
      criticalOnly: true
    },
    sms: {
      enabled: false,
      phoneNumber: '',
      budgetAlerts: true,
      complianceViolations: true,
      criticalOnly: true
    }
  });

  const [activeTab, setActiveTab] = useState('email');

  const alertTypes = [
    {
      id: 'budgetAlerts',
      name: 'Budget Alerts',
      description: 'Notifications when spending approaches or exceeds budget thresholds',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'complianceViolations',
      name: 'Compliance Violations',
      description: 'Immediate alerts for compliance policy violations',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'costOptimization',
      name: 'Cost Optimization',
      description: 'Recommendations for cost savings and resource optimization',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'weeklyReports',
      name: 'Weekly Reports',
      description: 'Weekly summary reports of cloud spending and compliance',
      icon: <Bell className="w-5 h-5" />
    }
  ];

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving notification settings:', settings);
  };

  const handleTest = (channel: string) => {
    // Simulate sending test notification
    console.log(`Sending test notification to ${channel}`);
  };

  const updateChannelSetting = (channel: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Bell className="w-8 h-8 text-blue-600 mr-3" />
          Notification Settings
        </h1>
        <p className="text-gray-600">Configure how you receive alerts and reports</p>
      </div>

      {/* Channel Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('slack')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'slack'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Slack</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>SMS</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive alerts and reports via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.email.enabled}
                    onChange={(e) => updateChannelSetting('email', 'enabled', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.email.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.email.address}
                      onChange={(e) => updateChannelSetting('email', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Alert Threshold (%)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={settings.email.threshold}
                      onChange={(e) => updateChannelSetting('email', 'threshold', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>50%</span>
                      <span className="font-medium">{settings.email.threshold}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Alert Types</h4>
                    {alertTypes.map((alertType) => (
                      <div key={alertType.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {alertType.icon}
                          <div>
                            <h5 className="font-medium text-gray-900">{alertType.name}</h5>
                            <p className="text-sm text-gray-600">{alertType.description}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.email[alertType.id as keyof typeof settings.email] as boolean}
                            onChange={(e) => updateChannelSetting('email', alertType.id, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleTest('email')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Test className="w-4 h-4" />
                      <span>Send Test Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Slack Settings */}
          {activeTab === 'slack' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Slack Notifications</h3>
                  <p className="text-sm text-gray-600">Receive alerts in your Slack workspace</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.slack.enabled}
                    onChange={(e) => updateChannelSetting('slack', 'enabled', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.slack.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                    <input
                      type="url"
                      value={settings.slack.webhookUrl}
                      onChange={(e) => updateChannelSetting('slack', 'webhookUrl', e.target.value)}
                      placeholder="https://hooks.slack.com/services/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Get your webhook URL from Slack App settings
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                    <input
                      type="text"
                      value={settings.slack.channel}
                      onChange={(e) => updateChannelSetting('slack', 'channel', e.target.value)}
                      placeholder="#finops-alerts"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">Critical Alerts Only</h5>
                      <p className="text-sm text-gray-600">Only send high-priority notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.slack.criticalOnly}
                        onChange={(e) => updateChannelSetting('slack', 'criticalOnly', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleTest('slack')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Test className="w-4 h-4" />
                      <span>Send Test Message</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SMS Settings */}
          {activeTab === 'sms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.sms.enabled}
                    onChange={(e) => updateChannelSetting('sms', 'enabled', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.sms.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={settings.sms.phoneNumber}
                      onChange={(e) => updateChannelSetting('sms', 'phoneNumber', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">Critical Alerts Only</h5>
                      <p className="text-sm text-gray-600">SMS limited to high-priority notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.sms.criticalOnly}
                        onChange={(e) => updateChannelSetting('sms', 'criticalOnly', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleTest('sms')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Test className="w-4 h-4" />
                      <span>Send Test SMS</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-medium text-red-900">Budget Alert: PCI Compliance</p>
                <p className="text-sm text-red-700">Sent via Email, Slack</p>
              </div>
              <span className="text-xs text-red-600">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Weekly Report</p>
                <p className="text-sm text-blue-700">Sent via Email</p>
              </div>
              <span className="text-xs text-blue-600">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <p className="font-medium text-orange-900">Cost Optimization</p>
                <p className="text-sm text-orange-700">Sent via Email</p>
              </div>
              <span className="text-xs text-orange-600">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};