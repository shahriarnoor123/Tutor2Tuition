import React, { useState, useEffect } from 'react';
import { AppProvider, useAppStore } from './services/store';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { HomeView } from './views/HomeView';
import { FindTutorsView } from './views/FindTutorsView';
import { TutorProfileView } from './views/TutorProfileView';
import { FindTuitionView } from './views/FindTuitionView';
import { TuitionDetailsView } from './views/TuitionDetailsView';
import { PostTuitionView } from './views/PostTuitionView';
import { TutorDashboardView } from './views/TutorDashboardView';
import { StudentDashboardView } from './views/StudentDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { TutorProfileEditView } from './views/TutorProfileEditView';
import { SavedItemsView } from './views/SavedItemsView';
import { MessagesView } from './views/MessagesView';
import { NotificationsView } from './views/NotificationsView';
import { HowItWorksView } from './views/HowItWorksView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { ApplyModal } from './components/modals/ApplyModal';
import { RequestTutorModal } from './components/modals/RequestTutorModal';

import { TutorProfile, TuitionPost } from './types';

const MainApp: React.FC = () => {
  const { currentRole } = useAppStore();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [navParam, setNavParam] = useState<string | undefined>(undefined);

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultMode, setAuthDefaultMode] = useState<'login' | 'register'>('login');
  const [selectedTutorForRequest, setSelectedTutorForRequest] = useState<TutorProfile | null>(null);
  const [selectedTuitionForApply, setSelectedTuitionForApply] = useState<TuitionPost | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, navParam]);

  const handleNavigate = (tab: string, param?: string) => {
    setCurrentTab(tab);
    setNavParam(param);
  };

  const handleOpenAuth = (defaultMode: 'login' | 'register' = 'login') => {
    setAuthDefaultMode(defaultMode);
    setAuthModalOpen(true);
  };

  const handleRequestTutor = (tutor: TutorProfile) => {
    setSelectedTutorForRequest(tutor);
  };

  const handleApplyTuition = (tuition: TuitionPost) => {
    setSelectedTuitionForApply(tuition);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased font-sans selection:bg-[#1769E0] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onRequestTutor={handleRequestTutor}
            onApplyTuition={handleApplyTuition}
          />
        )}

        {currentTab === 'tutors' && (
          <FindTutorsView
            initialFilter={navParam}
            onNavigate={handleNavigate}
            onRequestTutor={handleRequestTutor}
          />
        )}

        {currentTab === 'tutor-profile' && (
          <TutorProfileView
            tutorId={navParam || 'tut-1'}
            onNavigate={handleNavigate}
            onRequestTutor={handleRequestTutor}
          />
        )}

        {currentTab === 'tuitions' && (
          <FindTuitionView
            initialFilter={navParam}
            onNavigate={handleNavigate}
            onApplyTuition={handleApplyTuition}
          />
        )}

        {currentTab === 'tuition-details' && (
          <TuitionDetailsView
            tuitionId={navParam || 'tui-1'}
            onNavigate={handleNavigate}
            onApplyTuition={handleApplyTuition}
          />
        )}

        {currentTab === 'post-tuition' && (
          <PostTuitionView onNavigate={handleNavigate} />
        )}

        {currentTab === 'tutor-dashboard' && (
          <TutorDashboardView onNavigate={handleNavigate} />
        )}

        {currentTab === 'student-dashboard' && (
          <StudentDashboardView onNavigate={handleNavigate} />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboardView onNavigate={handleNavigate} />
        )}

        {currentTab === 'tutor-profile-edit' && (
          <TutorProfileEditView onNavigate={handleNavigate} />
        )}

        {currentTab === 'saved-items' && (
          <SavedItemsView
            onNavigate={handleNavigate}
            onRequestTutor={handleRequestTutor}
            onApplyTuition={handleApplyTuition}
          />
        )}

        {currentTab === 'messages' && (
          <MessagesView onNavigate={handleNavigate} />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView onNavigate={handleNavigate} />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksView onNavigate={handleNavigate} />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authDefaultMode}
      />

      <ApplyModal
        tuition={selectedTuitionForApply}
        onClose={() => setSelectedTuitionForApply(null)}
        onSuccess={() => {
          if (currentRole === 'tutor') {
            handleNavigate('tutor-dashboard');
          }
        }}
      />

      <RequestTutorModal
        tutor={selectedTutorForRequest}
        onClose={() => setSelectedTutorForRequest(null)}
        onSuccess={() => {
          if (currentRole === 'student_parent') {
            handleNavigate('student-dashboard');
          }
        }}
      />

      {/* Toast Feedback Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
