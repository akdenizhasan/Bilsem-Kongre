import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-white p-2 rounded-2xl inline-block shadow-lg">
                <img 
                  src="https://raw.githubusercontent.com/HasanAkdeniz/BekerBilsemLogo/main/logo.png" 
                  alt="Bilim ve Sanat Merkezi" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100x100?text=Beker";
                  }}
                />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight uppercase">Bilim ve Sanat Merkezi</span>
                <span className="block text-xs text-blue-300 uppercase tracking-widest font-semibold">2026 Akademik Kongresi</span>
              </div>
            </div>
            <p className="text-blue-100 max-w-md leading-relaxed text-sm opacity-80">
              Hacı Çelebi Döndü Beker Bilim ve Sanat Merkezi tarafından düzenlenen, özel yetenekli çocukların eğitimi alanında çalışan akademisyen, öğretmen ve uzmanları bir araya getiren prestijli bir akademik buluşma.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">Hızlı Bağlantılar</h4>
            <ul className="space-y-4 text-blue-100 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Kurullar</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Yazım Kuralları</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Önemli Tarihler</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Ulaşım ve Konaklama</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">İletişim</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex items-center space-x-3">
                <span className="bg-white/10 p-2 rounded-lg">📧</span>
                <span>hasanakdeniz.gazi@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-white/10 p-2 rounded-lg">📍</span>
                <span>Gazi Üniversitesi, Ankara</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-white/10 p-2 rounded-lg">📱</span>
                <span>+90 (312) XXX XX XX</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-blue-400 font-medium">
          <p>© 2026 Bilim ve Sanat Merkezi Akademik Kongresi. Tüm hakları saklıdır.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Kişisel Verilerin Korunması</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
};export default Footer;