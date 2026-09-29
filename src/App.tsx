import React, { useState, useEffect } from 'react';
import { Role, Language } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { TrainerDashboard } from './components/dashboards/TrainerDashboard';
import { TraineeDashboard } from './components/dashboards/TraineeDashboard';
import { EmployerDashboard } from './components/dashboards/EmployerDashboard';
import { CoopCareerChatbot } from './components/chatbot/CoopCareerChatbot';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    if (type === 'programme') {
      setCurrentRole('admin');
    } else if (type === 'course') {
      setCurrentRole('trainee');
    } else if (type === 'job') {
      setCurrentRole('trainee');
    } else if (type === 'certificate') {
      setCurrentRole('trainee');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        language={language}
        onSelectLanguage={setLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentRole === null && (
          <LandingPage
            onSelectRole={setCurrentRole}
            language={language}
          />
        )}

        {currentRole === 'admin' && (
          <AdminDashboard />
        )}

        {currentRole === 'trainer' && (
          <TrainerDashboard />
        )}

        {currentRole === 'trainee' && (
          <TraineeDashboard
            onOpenChatbot={() => {
              // Can trigger chatbot open if needed
            }}
          />
        )}

        {currentRole === 'employer' && (
          <EmployerDashboard />
        )}
      </div>

      {/* Global SIH Prototype Footer */}
      <Footer />

      {/* Floating CoopCareer AI Chatbot (Accessible across whole ecosystem) */}
      <CoopCareerChatbot />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

    </div>
  );
};

export default App;
