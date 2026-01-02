
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
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-24">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onNavigate(AppView.HOME)}>
            <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 transition-transform group-hover:scale-105">
              <img 
                src="https://raw.githubusercontent.com/HasanAkdeniz/BekerBilsemLogo/main/logo.png" 
                alt="Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-slate-900 font-extrabold text-lg tracking-tight leading-none uppercase">Bilim ve Sanat Merkezi</span>
              <span className="block text-[10px] text-blue-600 font-black uppercase tracking-[0.25em] mt-1">2026 Akademik Kongresi</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-sm font-bold uppercase tracking-widest transition-all relative py-2 ${
                  currentView === item.view 
                  ? 'text-blue-600 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-blue-600 after:rounded-full' 
                  : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate(AppView.ABSTRACT_SUBMISSION)}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Başvur
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 p-2 hover:bg-slate-50 rounded-2xl transition-colors">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
               </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 py-6 px-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
           {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => { onNavigate(item.view); setIsMenuOpen(false); }}
                className={`block w-full text-left px-6 py-4 rounded-2xl text-base font-bold uppercase tracking-widest transition-colors ${
                  currentView === item.view ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
