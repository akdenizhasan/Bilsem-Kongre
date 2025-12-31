import React, { useState, useEffect } from 'react';
import { AppView } from '../types';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openThemeIndex, setOpenThemeIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Kongre Başlangıç Tarihi: 12 Haziran 2026, 09:00
  const conferenceDate = new Date('2026-06-12T09:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    { 
      title: 'İnsan Zekâsı ve Bilişsel Süreçler', 
      icon: '🧠', 
      color: 'bg-[#0097a7]',
      details: 'Zekâ ve bilişin temel mekanizmaları, yaratıcı düşünme süreçleri ve insan beyninin öğrenme kapasitesi üzerine araştırmalar.' 
    },
    { 
      title: 'Yapay Zekâ ile Etkileşim ve Düşünme', 
      icon: '🤖', 
      color: 'bg-[#0097a7]',
      details: 'İnsan-makine etkileşimi, yapay zekânın karar alma süreçlerine etkisi ve bilişim sistemleri ile yeni düşünme biçimleri.'
    },
    { 
      title: 'Yapay Zekâ Destekli Üretim Süreçleri', 
      icon: '⚙️', 
      color: 'bg-[#0097a7]',
      details: 'Sanat, tasarım ve endüstriyel üretimde yapay zekâ araçlarının kullanımı, otomasyon ve yaratıcı üretim teknikleri.'
    },
    { 
      title: 'Görsel Algı, Tasarım ve Estetik', 
      icon: '🎨', 
      color: 'bg-[#0097a7]',
      details: 'Görsel sanatlar, tasarım ilkeleri ve estetik algının bilişsel temelleri; yapay zekâ destekli sanatsal üretimler.'
    },
    { 
      title: 'Müzik, Ritim ve Biliş', 
      icon: '🎵', 
      color: 'bg-[#0097a7]',
      details: 'Müzikal algı, ritim çalışmaları ve işitsel süreçlerin algoritmik müzik çalışmaları ile entegrasyonu.'
    },
    { 
      title: 'Fen ve Mühendislik Araştırmaları', 
      icon: '🧪', 
      color: 'bg-[#0097a7]',
      details: 'Fizik, kimya, biyoloji ve mühendislik temelli disiplinlerarası çalışmalar; teknolojik inovasyonlar.'
    },
    { 
      title: 'Sosyal ve Beşerî Bilimler', 
      icon: '🌍', 
      color: 'bg-[#0097a7]',
      details: 'Tarih, coğrafya, felsefe ve sosyoloji alanlarında özel yetenekli eğitimine yönelik araştırmalar.'
    },
    { 
      title: 'Eğitim ve Psikoloji Araştırmaları', 
      icon: '📖', 
      color: 'bg-[#0097a7]',
      details: 'Öğrenme süreçleri, öğrenci gelişimi, ölçme-değerlendirme ve rehberlik hizmetleri üzerine akademik çıktılar.'
    },
    { 
      title: 'Matematiksel Modelleme', 
      icon: '🔢', 
      color: 'bg-[#0097a7]',
      details: 'Sayısal akıl yürütme, istatistiksel modeller ve problem çözme becerilerinin geliştirilmesi.'
    }
  ];

  const toggleTheme = (index: number) => {
    setOpenThemeIndex(openThemeIndex === index ? null : index);
  };

  const handleExternalSubmission = () => {
    window.open('https://forms.gle/iJfXeWRhFjGEaPit5', '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1920" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-200 text-sm font-bold uppercase tracking-widest mb-6">
              12-13 Haziran 2026 • Ankara
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Potansiyelin İzdüşümleri
            </h1>
            <h2 className="text-2xl md:text-4xl font-medium text-blue-200 mb-8 italic opacity-90 font-serif">
              İnsan Zekâsı, Yapay Zekâ ve Bilişsel-Sanatsal Üretim
            </h2>
            <p className="text-lg text-blue-100/80 mb-10 leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-6">
              Bilim ve Sanat Merkezi Akademik Kongresi – 2026. Bilimsel ve yaratıcı potansiyelin geleceğini şekillendiren disiplinlerarası bir buluşma.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleExternalSubmission}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/20"
              >
                Bildiri Özeti Gönder
              </button>
              <button 
                onClick={() => onNavigate(AppView.SCHEDULE)}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Program Detayları
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - ECHA Style */}
      <section className="relative py-24 bg-gradient-to-br from-[#4ade80] to-[#0891b2] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="white" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,160C672,128,768,64,864,64C960,64,1056,128,1152,144C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight drop-shadow-md">
            #BilimVeSanat2026 İçin Geri Sayım...
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black mb-2">{timeLeft.days}</span>
              <span className="text-lg md:text-2xl uppercase tracking-widest font-medium opacity-90">Gün</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black mb-2">{timeLeft.hours}</span>
              <span className="text-lg md:text-2xl uppercase tracking-widest font-medium opacity-90">Saat</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black mb-2">{timeLeft.minutes}</span>
              <span className="text-lg md:text-2xl uppercase tracking-widest font-medium opacity-90">Dakika</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black mb-2">{timeLeft.seconds}</span>
              <span className="text-lg md:text-2xl uppercase tracking-widest font-medium opacity-90">Saniye</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Themes Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#eeb417] mb-6">Kongre Temaları</h2>
            <div className="w-24 h-1 bg-[#eeb417] mx-auto mb-8 opacity-30"></div>
          </div>
          
          <div className="space-y-3">
            {themes.map((theme, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleTheme(idx)}
                  className={`w-full flex items-center justify-between p-6 transition-colors duration-300 ${
                    openThemeIndex === idx ? 'bg-white' : 'bg-[#0097a7] text-white hover:bg-[#00838f]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{theme.icon}</span>
                    <span className={`text-xl font-bold text-left ${openThemeIndex === idx ? 'text-[#0097a7]' : 'text-white'}`}>
                      {theme.title}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform duration-300 ${
                    openThemeIndex === idx ? 'border-[#0097a7] text-[#0097a7] rotate-45' : 'border-white/50 text-white'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openThemeIndex === idx ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-8 bg-white border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {theme.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rationale Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-6 text-blue-100/80 leading-relaxed text-lg">
                <p>Bilim ve Sanat Merkezi'nde öğrenim gören öğrenciler, belirli bir bilişsel ve yaratıcı potansiyel ile eğitim süreçlerine dâhil olmaktadır. Bu potansiyel, insan zekâsının problem çözme, anlamlandırma, estetik üretim ve yaratıcı düşünme kapasitesine dayanmaktadır.</p>
                <p>Yapay zekâ, bu bağlamda yeni bir zekâ türü olmaktan ziyade, insan zekâsının düşünme biçimlerini, üretim süreçlerini ve ifade kanallarını dönüştüren bilişsel bir ara yüz olarak ele alınmaktadır.</p>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-400/20 p-12 rounded-[40px] backdrop-blur-xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl shadow-xl shadow-blue-600/30">💡</div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400 italic">"Zekâ bir son değil, sonsuz bir başlangıçtır."</h3>
              <p className="text-blue-100 leading-relaxed">Kongremiz; insan zekâsı, yapay zekâ ve bilişsel-sanatsal üretim ekseninde belirlenmiş alt temalarla birlikte; Bilim ve Sanat Merkezi kapsamında yürütülen tüm nitelikli akademik ve disipliner çalışmaları kongre kapsamına dahil etmektedir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="py-24 bg-blue-50 relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Yeni Özellik: Gelişmiş AI Asistanı</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Akademik Süreçlerinizde Yanınızdayız</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Özet yazımı, tema uygunluğu kontrolü ve literatür taraması konularında Gemini 3 Pro destekli asistanımızdan yardım alabilirsiniz.
          </p>
          <button 
            onClick={() => onNavigate(AppView.AI_ASSISTANT)}
            className="inline-flex items-center space-x-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl"
          >
            <span>AI Asistanı Deneyimle</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;