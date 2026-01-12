
import React from 'react';
import { AppView } from '../types.ts';

interface FooterProps {
  onNavigate?: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0f172a] text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-transparent inline-block">
                <img 
                  src="https://raw.githubusercontent.com/HasanAkdeniz/BekerBilsemLogo/main/logo.png" 
                  alt="Kongre Logosu" 
                  className="h-24 w-auto drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100x100?text=Beker";
                  }}
                />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight uppercase">Bilim ve Sanat Merkezi</span>
                <span className="block text-xs text-amber-500 uppercase tracking-widest font-black mt-1">2026 Akademik Kongresi</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-sm opacity-90 italic">
              "Hacı Çelebi Döndü Beker Bilim ve Sanat Merkezi tarafından düzenlenen, özel yetenekli çocukların eğitimi alanında çalışan akademisyen, öğretmen ve uzmanları bir araya getiren prestijli bir akademik buluşma."
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-amber-600">Navigasyon</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-medium">
              <li><button onClick={() => onNavigate?.(AppView.HOME)} className="hover:text-amber-500 transition-colors">Ana Sayfa</button></li>
              <li><button onClick={() => onNavigate?.(AppView.COMMITTEE)} className="hover:text-amber-500 transition-colors">Kurullar</button></li>
              <li><button onClick={() => onNavigate?.(AppView.ABSTRACT_SUBMISSION)} className="hover:text-amber-500 transition-colors">Bildiri Gönderimi</button></li>
              <li><button onClick={() => onNavigate?.(AppView.DATES)} className="hover:text-amber-500 transition-colors">Önemli Tarihler</button></li>
              <li><button onClick={() => onNavigate?.(AppView.SCHEDULE)} className="hover:text-amber-500 transition-colors">Program Akışı</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-amber-600">Sekretarya</h4>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-center space-x-3">
                <span className="bg-white/5 p-2 rounded-lg">📧</span>
                <span>hasanakdeniz.gazi@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-white/5 p-2 rounded-lg">📍</span>
                <span>Gazi Üniversitesi, Ankara</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-white/5 p-2 rounded-lg">🏫</span>
                <span className="text-xs">Hacı Çelebi Döndü Beker BİLSEM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
          <p>© 2026 Bilim ve Sanat Merkezi Akademik Kongresi. Tüm hakları saklıdır.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">KVKK Aydınlatma Metni</a>
            <span className="text-slate-800">|</span>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Web Tasarım: Beker Bilsem</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
