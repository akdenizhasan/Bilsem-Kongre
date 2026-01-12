
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
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-24">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onNavigate(AppView.HOME)}>
            <div className="relative transition-transform group-hover:scale-105">
              <img 
                src="https://raw.githubusercontent.com/HasanAkdeniz/BekerBilsemLogo/main/logo.png" 
                alt="Kongre Logosu" 
                className="h-20 w-auto object-contain"
                onError={(e) => {
                   // Fallback to local image or direct link if needed
                }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-[#0f172a] font-extrabold text-lg tracking-tight leading-none uppercase">Bilim ve Sanat Merkezi</span>
              <span className="block text-[10px] text-[#b45309] font-black uppercase tracking-[0.25em] mt-1">2026 Akademik Kongresi</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-xs font-bold uppercase tracking-widest transition-all relative py-2 ${
                  currentView === item.view 
                  ? 'text-[#b45309] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-[#b45309] after:rounded-full' 
                  : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate(AppView.ABSTRACT_SUBMISSION)}
              className="bg-[#0f172a] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#b45309] transition-all shadow-xl shadow-slate-900/10 active:scale-95"
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
                  currentView === item.view ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
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
