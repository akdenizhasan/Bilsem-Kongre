
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

  const googleFormUrl = "https://forms.gle/iJfXeWRhFjGEaPit5";

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">Bildiri Gönderimi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Akademik çalışmalarınızı topluluğumuzla paylaşmak için ilk adımı atın.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            {/* Call to Action Section - REPLACES IFRAME */}
            <section className="relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-3xl opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 text-center space-y-8">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Başvurunuzu Tamamlayın</h2>
                  <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                    Bildiri özetinizi sisteme yüklemek için aşağıdaki butona tıklayarak başvuru formuna erişebilirsiniz. Form yeni bir pencerede açılacaktır.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-6">
                  <a 
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-blue-600 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-blue-500/25 active:scale-95 group"
                  >
                    <span>Bildiri Gönder</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.2em]">Google Formlar Aracılığıyla Güvenli Gönderim</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-50">
                   <div className="space-y-2">
                     <div className="text-blue-600 font-bold text-lg">01</div>
                     <div className="text-sm font-bold text-slate-700">Özeti Hazırla</div>
                   </div>
                   <div className="space-y-2">
                     <div className="text-blue-600 font-bold text-lg">02</div>
                     <div className="text-sm font-bold text-slate-700">Formu Doldur</div>
                   </div>
                   <div className="space-y-2">
                     <div className="text-blue-600 font-bold text-lg">03</div>
                     <div className="text-sm font-bold text-slate-700">Onayı Bekle</div>
                   </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                <span>Bilgilendirme</span>
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                <p>Bilim ve Sanat Merkezi Akademik Kongresi 2026 Düzenleme Kurulu, sizleri özel yeteneklilerin eğitimi alanındaki özgün araştırmalarınızı paylaşmaya davet ediyor. Bildiriler sözlü veya poster sunum şeklinde kabul edilecektir.</p>
                <p className="mt-4">Tüm özetler hakem kurulu tarafından körleme yöntemiyle değerlendirilecektir. Kabul edilen özetler kongre özet kitabında yayınlanacaktır.</p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Guidelines Card */}
            <button 
              onClick={() => setShowGuideModal(true)}
              className="w-full bg-slate-900 text-white p-10 rounded-[2.5rem] text-left relative overflow-hidden group shadow-2xl hover:shadow-blue-500/10 transition-all"
            >
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-xl font-bold mb-4 relative z-10">Yazım Kuralları</h4>
              <p className="text-slate-400 text-sm mb-8 relative z-10 leading-relaxed">Özetinizi hazırlamadan önce mutlaka yazım kılavuzumuzu inceleyin.</p>
              <div className="flex items-center text-blue-400 font-bold text-sm relative z-10">
                <span>Kılavuzu İncele</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
              </div>
            </button>

            {/* Template Download */}
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Özet Şablonu</h4>
              <p className="text-xs text-slate-400 mb-6">Dosya formatı: .docx (Microsoft Word)</p>
              <button className="w-full bg-slate-50 border border-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-colors">
                Şablonu İndir
              </button>
            </div>

            {/* Support */}
            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem]">
              <h4 className="font-bold text-indigo-900 mb-6">Teknik Destek</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-indigo-700 text-sm">
                  <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">📧</span>
                  <span className="font-medium">hasanakdeniz.gazi@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-indigo-700 text-sm">
                  <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">📍</span>
                  <span className="font-medium">Gazi Üniversitesi, Ankara</span>
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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
            onClick={() => setShowGuideModal(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-50 p-8 flex justify-between items-center border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mr-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                Yazım ve Gönderim Kuralları
              </h3>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="bg-slate-200/50 hover:bg-slate-200 p-3 rounded-full transition-colors text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-10 max-h-[60vh] overflow-y-auto">
              <div className="space-y-8">
                {submissionRules.map((rule, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 transition-colors border border-slate-100 group-hover:border-blue-100">
                      {i + 1}
                    </div>
                    <p className="text-slate-600 leading-relaxed pt-1 text-lg">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start space-x-4">
                <svg className="w-6 h-6 text-amber-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Dikkat:</strong> Formun yeni sekmede açılmasını engelleyen bir "açılır pencere engelleyicisi" (popup blocker) kullanıyorsanız, lütfen izin verin.
                </p>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowGuideModal(false)}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbstractSubmission;
