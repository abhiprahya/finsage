import React, { useState } from 'react';
import { Shield, TrendingUp, Users, DollarSign, Scale } from 'lucide-react';
import type { User, UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('CFO');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles: { role: UserRole; icon: React.ReactNode; description: string }[] = [
    { role: 'CFO', icon: <DollarSign className="w-6 h-6" />, description: 'Financial oversight and strategic planning' },
    { role: 'FinOps Analyst', icon: <TrendingUp className="w-6 h-6" />, description: 'Cost optimization and analysis' },
    { role: 'Cloud Manager', icon: <Users className="w-6 h-6" />, description: 'Infrastructure and resource management' },
    { role: 'CISO', icon: <Shield className="w-6 h-6" />, description: 'Security and compliance oversight' },
    { role: 'Compliance Officer', icon: <Scale className="w-6 h-6" />, description: 'Regulatory compliance and audit management' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: User = {
      id: '1',
      name: selectedRole === 'CFO' ? 'Sarah Johnson' : 
            selectedRole === 'FinOps Analyst' ? 'Michael Chen' :
            selectedRole === 'Cloud Manager' ? 'David Rodriguez' : 
            selectedRole === 'CISO' ? 'Jennifer Kim' : 'Rajesh Sharma',
      email: email || `${selectedRole.toLowerCase().replace(' ', '.')}@finsage.ai`,
      role: selectedRole,
    };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-center">
          <div className="text-white">
            <div className="flex items-center mb-8">
              <Shield className="w-12 h-12 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">FinSage.ai</h1>
                <p className="text-blue-200">Compliance-aware FinOps for BFSI</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Forecasting</h3>
                  <p className="text-blue-200 text-sm">Predict cloud costs with 95% accuracy</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Compliance First</h3>
                  <p className="text-blue-200 text-sm">Built for PCI, IRDAI, RBI, and regulatory requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Multi-Cloud Support</h3>
                  <p className="text-blue-200 text-sm">AWS, Azure, GCP unified management</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Regulatory Impact Analysis</h3>
                  <p className="text-blue-200 text-sm">Model cost impact of new policies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your FinSage.ai account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map(({ role, icon, description }) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        selectedRole === role
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        {icon}
                        <span className="font-medium text-xs">{role}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {roles.find(r => r.role === selectedRole)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In as {selectedRole}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo credentials work for all roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};