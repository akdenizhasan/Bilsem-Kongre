
import React, { useState } from 'react';
import { AppView } from '../types.ts';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Ana Sayfa', view: AppView.HOME },
    { label: 'Program', view: AppView.SCHEDULE },
    { label: 'Bildiri Gönderimi', view: AppView.ABSTRACT_SUBMISSION },
    { label: 'Önemli Tarihler', view: AppView.DATES },
    { label: 'Kurullar', view: AppView.COMMITTEE },
    { label: 'AI Asistan', view: AppView.AI_ASSISTANT },
  ];

  const handleExternalSubmission = () => {
    window.open('https://forms.gle/iJfXeWRhFjGEaPit5', '_blank');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate(AppView.HOME)}>
            <div className="bg-white p-1 rounded-xl transition-transform group-hover:scale-105">
              <img 
                src="https://raw.githubusercontent.com/HasanAkdeniz/BekerBilsemLogo/main/logo.png" 
                alt="Bilim ve Sanat Merkezi" 
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150x150?text=Beker";
                }}
              />
            </div>
            <div className="hidden sm:block border-l-2 border-blue-900/10 pl-3">
              <span className="block text-blue-900 font-black leading-tight uppercase text-base tracking-tighter">Bilim ve Sanat Merkezi</span>
              <span className="block text-[10px] text-blue-600/60 uppercase tracking-[0.2em] font-black -mt-0.5">2026 Akademik Kongresi</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-xs font-bold uppercase tracking-tight transition-all relative py-2 ${
                  currentView === item.view 
                  ? 'text-blue-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={handleExternalSubmission}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 uppercase ml-2 active:scale-95"
            >
              Bildiri Gönder
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
               </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
           {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => { onNavigate(item.view); setIsMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-colors ${
                  currentView === item.view ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-4 flex flex-col space-y-2">
              <button 
                onClick={() => { handleExternalSubmission(); setIsMenuOpen(false); }}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase shadow-lg shadow-blue-500/20"
              >
                Bildiri Gönder
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={() => { onNavigate(AppView.REVIEWER); setIsMenuOpen(false); }}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-[10px] font-bold uppercase"
                >
                  Hakem
                </button>
                <button 
                  onClick={() => { onNavigate(AppView.ADMIN); setIsMenuOpen(false); }}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-[10px] font-bold uppercase"
                >
                  Yönetim
                </button>
              </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;