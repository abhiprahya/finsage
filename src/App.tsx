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
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export type UserRole = 'CFO' | 'FinOps Analyst' | 'Cloud Manager' | 'CISO' | 'Compliance Officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type Page = 'dashboard' | 'cloud-integration' | 'compliance' | 'forecast' | 'chargeback' | 'notifications' | 'reports' | 'regulatory-impact' | 'ai-optimization';

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
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;