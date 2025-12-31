import React, { useState } from 'react';

const AbstractSubmission: React.FC = () => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  const submissionRules = [
    'Özetler en az 250, en fazla 500 kelime olmalıdır.',
    'En az 3, en fazla 5 anahtar kelime eklenmelidir.',
    'Özet; Amaç, Yöntem, Bulgular ve Sonuç bölümlerini içermelidir.',
    'Tüm gönderimler Türkçe veya İngilizce olarak yapılabilir.',
    'Dosya formatı .doc veya .docx olmalıdır.',
    'Yazarların isimleri ve kurum bilgileri özet metni içerisinde yer almamalıdır (Kör hakemlik süreci için).'
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-100 py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Bildiri Özeti Gönderimi</h1>
          <nav className="flex mt-4 text-sm text-gray-500 space-x-2">
            <span>Ana Sayfa</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">Bildiri Özeti Gönderimi</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">Çağrı Metni</h2>
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                <p>Bilim ve Sanat Merkezi Akademik Kongresi 2026 Düzenleme Kurulu, sizleri özel yeteneklilerin eğitimi alanındaki özgün araştırmalarınızı ve uygulama örneklerinizi paylaşmaya davet ediyor.</p>
                <p className="mt-4">Kongreye sunulacak bildiriler için özet metinlerin gönderimi başlamıştır. Bildiriler sözlü veya poster sunum şeklinde kabul edilecektir. Tüm özetler hakem kurulu tarafından körleme yöntemiyle değerlendirilecektir.</p>
              </div>
            </section>

            <div className="space-y-12">
              <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-wider">Bildiri Gönderim Kılavuzu</h3>
                <p className="text-gray-700 mb-6">Yazım kuralları, format ve gönderim detayları hakkında bilgi almak için kılavuzu inceleyin.</p>
                <button 
                  onClick={() => setShowGuideModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Kılavuzu Görüntüle</span>
                </button>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">Bildiri Gönderim Formu</h3>
                <p className="mb-8 text-gray-600">Bildiri özetlerinizi aşağıdaki form aracılığıyla sisteme yükleyebilirsiniz. Formun doğru şekilde görüntülendiğinden emin olun.</p>
                
                <div className="w-full bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-inner">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSe_9-kI8D_0O_AAn5vjW6y8u49y46W_4L_v7Yn9Y2n9Y2n9Y2/viewform?embedded=true" 
                    width="100%" 
                    height="1000" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="w-full"
                    title="Bildiri Gönderim Formu"
                  >
                    Yükleniyor…
                  </iframe>
                </div>
                
                <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm text-gray-500 italic">Formu göremiyorsanız buraya tıklayın:</p>
                  <a 
                    href="https://forms.gle/iJfXeWRhFjGEaPit5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline text-sm"
                  >
                    Formu Yeni Sekmede Aç
                  </a>
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-lg mb-4 text-blue-900 border-b pb-2">Özet Şablonu</h4>
              <p className="text-sm text-gray-600 mb-4">Lütfen özetinizi hazırlarken standart şablonumuzu kullanınız.</p>
              <button className="w-full bg-white border-2 border-blue-100 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Şablonu İndir (.docx)</span>
              </button>
            </div>

            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl">
              <h4 className="font-bold text-lg mb-4 border-b border-white/20 pb-2">Destek Hattı</h4>
              <p className="text-sm text-blue-100 mb-6">Bildiri gönderim sürecinde teknik bir sorun yaşarsanız bizimle iletişime geçin.</p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">📧</span>
                  <span>hasanakdeniz.gazi@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">📍</span>
                  <span>Gazi Üniversitesi, Ankara</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowGuideModal(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-900 p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Bildiri Yazım ve Gönderim Kuralları
              </h3>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <ul className="space-y-6">
                {submissionRules.map((rule, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {rule}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
                <svg className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <strong>Önemli:</strong> Zamanında gönderilmeyen veya yazım kurallarına uymayan bildiriler hakem değerlendirmesine alınmayacaktır.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Anladım, Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbstractSubmission;