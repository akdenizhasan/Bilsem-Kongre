
import React, { useState, useEffect } from 'react';
import { AppView } from '../types.ts';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openThemeIndex, setOpenThemeIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const conferenceDate = new Date('2026-06-12T09:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [conferenceDate]);

  const themes = [
    { title: 'Bilişsel Süreçler & Zekâ', icon: '🧠', details: 'İnsan zihninin derinlikleri, yaratıcı düşünme ve öğrenme kapasitesi.', color: 'from-blue-50 to-indigo-50' },
    { title: 'Geleceğin Eğitim Teknolojileri', icon: '💻', details: 'Bilişim sistemleri ve yapay zekâ ile dönen yeni nesil eğitim modelleri.', color: 'from-emerald-50 to-teal-50' },
    { title: 'Sanat, Tasarım ve Estetik', icon: '🎨', details: 'Görsel sanatların ve estetik algının bilişsel temelleri.', color: 'from-rose-50 to-orange-50' },
    { title: 'Bilimsel Araştırma Yöntemleri', icon: '🧪', details: 'Fen ve mühendislik bilimlerinde disiplinlerarası yaklaşımlar.', color: 'from-amber-50 to-yellow-50' },
    { title: 'BİLSEM & Özel Yetenek', icon: '🌟', details: 'Özel yetenekli çocukların eğitimi ve gelişim stratejileri.', color: 'from-purple-50 to-fuchsia-50' }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section - Canva Style */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">12-13 Haziran 2026 • Ankara</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-6 leading-tight">
              Potansiyelin <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">İzdüşümleri</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bilim ve Sanat Merkezi Akademik Kongresi. İnsan zekâsını, bilimi ve sanatı geleceğin teknolojileriyle harmanlıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate(AppView.ABSTRACT_SUBMISSION)} 
                className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Bildiri Özeti Gönder
              </button>
              <button 
                onClick={() => onNavigate(AppView.SCHEDULE)} 
                className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                Programı İncele
              </button>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-[3rem] rotate-3 scale-95 opacity-10 group-hover:rotate-6 transition-transform"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
              alt="Kongre" 
              className="relative z-10 w-full h-[500px] object-cover rounded-[3rem] shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Countdown - Modern & Clean */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-12 border border-slate-100">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Gün', val: timeLeft.days },
                { label: 'Saat', val: timeLeft.hours },
                { label: 'Dakika', val: timeLeft.minutes },
                { label: 'Saniye', val: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                   <div className="text-5xl md:text-7xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.val}</div>
                   <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">{item.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Themes - Canva Grid Style */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Kongre Temaları</h2>
            <p className="text-slate-500 font-medium">Bilimsel araştırmaların odak noktaları ve akademik alt başlıklar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme, idx) => (
              <div 
                key={idx} 
                className={`canva-card p-10 rounded-[2.5rem] bg-gradient-to-br ${theme.color} border border-white shadow-sm flex flex-col items-center text-center`}
              >
                <div className="text-5xl mb-6 bg-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm">{theme.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{theme.title}</h3>
                <p className="text-slate-600 leading-relaxed">{theme.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-24 bg-slate-900 rounded-t-[5rem] text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Siz de Katılın!</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">Hacı Çelebi Döndü Beker Bilsem ev sahipliğinde gerçekleşecek bu akademik şölende yerinizi ayırtın.</p>
          <button 
            onClick={() => onNavigate(AppView.ABSTRACT_SUBMISSION)}
            className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
          >
            Hemen Başvur
          </button>
      </section>
    </div>
  );
};

export default Home;
