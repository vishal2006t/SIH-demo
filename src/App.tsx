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
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'admin' || roleParam === 'trainer' || roleParam === 'trainee' || roleParam === 'employer') {
        return roleParam;
      }
    }
    return null;
  });
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const handleSelectRole = (role: Role) => {
    setCurrentRole(role);
    setIsMobileSidebarOpen(false);
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    setIsMobileSidebarOpen(false);
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        language={language}
        onSelectLanguage={setLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main View Router */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 min-w-0 max-w-full overflow-x-hidden">
        {currentRole === null && (
          <LandingPage
            onSelectRole={handleSelectRole}
            language={language}
          />
        )}

        {currentRole === 'admin' && (
          <AdminDashboard
            isMobileNavOpen={isMobileSidebarOpen}
            onCloseMobileNav={() => setIsMobileSidebarOpen(false)}
            onOpenMobileNav={() => setIsMobileSidebarOpen(true)}
          />
        )}

        {currentRole === 'trainer' && (
          <TrainerDashboard
            isMobileNavOpen={isMobileSidebarOpen}
            onCloseMobileNav={() => setIsMobileSidebarOpen(false)}
            onOpenMobileNav={() => setIsMobileSidebarOpen(true)}
          />
        )}

        {currentRole === 'trainee' && (
          <TraineeDashboard
            isMobileNavOpen={isMobileSidebarOpen}
            onCloseMobileNav={() => setIsMobileSidebarOpen(false)}
            onOpenMobileNav={() => setIsMobileSidebarOpen(true)}
            onOpenChatbot={() => {
              // Can trigger chatbot open if needed
            }}
          />
        )}

        {currentRole === 'employer' && (
          <EmployerDashboard
            isMobileNavOpen={isMobileSidebarOpen}
            onCloseMobileNav={() => setIsMobileSidebarOpen(false)}
            onOpenMobileNav={() => setIsMobileSidebarOpen(true)}
          />
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
