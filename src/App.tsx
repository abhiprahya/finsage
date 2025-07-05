import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { CloudIntegration } from './components/CloudIntegration';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { AIForecast } from './components/AIForecast';
import { ChargebackSummary } from './components/ChargebackSummary';
import { NotificationSettings } from './components/NotificationSettings';
import { ReportsPage } from './components/ReportsPage';
import { RegulatoryImpact } from './components/RegulatoryImpact';
import { AIOptimization } from './components/AIOptimization';
import { ComplianceFrameworks } from './components/ComplianceFrameworks';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export type UserRole = 'CFO' | 'FinOps Analyst' | 'Cloud Manager' | 'CISO' | 'Compliance Officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  title?: string;
  country?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  lastLogin?: string;
}

export type Page = 'dashboard' | 'cloud-integration' | 'compliance' | 'forecast' | 'chargeback' | 'notifications' | 'reports' | 'regulatory-impact' | 'ai-optimization' | 'compliance-frameworks' | 'profile' | 'settings';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'cloud-integration':
        return <CloudIntegration user={user} />;
      case 'compliance':
        return <ComplianceDashboard user={user} />;
      case 'forecast':
        return <AIForecast user={user} />;
      case 'chargeback':
        return <ChargebackSummary user={user} />;
      case 'notifications':
        return <NotificationSettings user={user} />;
      case 'reports':
        return <ReportsPage user={user} />;
      case 'regulatory-impact':
        return <RegulatoryImpact user={user} />;
      case 'ai-optimization':
        return <AIOptimization user={user} />;
      case 'compliance-frameworks':
        return <ComplianceFrameworks user={user} />;
      case 'profile':
        return <ProfilePage user={user} onUpdateProfile={handleProfileUpdate} />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        user={user} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      <div className="flex-1 flex flex-col">
        <Header 
          user={user} 
          onLogout={handleLogout}
          onPageChange={setCurrentPage}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;