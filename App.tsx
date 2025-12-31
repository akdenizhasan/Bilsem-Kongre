import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AbstractSubmission from './pages/AbstractSubmission';
import Assistant from './pages/Assistant';
import Schedule from './pages/Schedule';
import Dates from './pages/Dates';
import Committee from './pages/Committee';
import { AppView } from './types';

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
      <Footer />
    </div>
  );
};

export default App;