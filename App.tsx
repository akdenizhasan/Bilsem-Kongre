
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import AbstractSubmission from './pages/AbstractSubmission.tsx';
import Assistant from './pages/Assistant.tsx';
import Schedule from './pages/Schedule.tsx';
import Dates from './pages/Dates.tsx';
import Committee from './pages/Committee.tsx';
import ReviewerPortal from './pages/ReviewerPortal.tsx';
import AdminPortal from './pages/AdminPortal.tsx';
import { AppView } from './types.ts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onNavigate={setCurrentView} />;
      case AppView.ABSTRACT_SUBMISSION:
        return <AbstractSubmission />;
      case AppView.AI_ASSISTANT:
        return <Assistant />;
      case AppView.SCHEDULE:
        return <Schedule />;
      case AppView.DATES:
        return <Dates />;
      case AppView.COMMITTEE:
        return <Committee />;
      case AppView.ADMIN:
        return <AdminPortal />;
      case AppView.REVIEWER:
        return <ReviewerPortal />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] selection:bg-blue-200 selection:text-blue-900">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default App;