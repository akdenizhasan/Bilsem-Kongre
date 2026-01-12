
import React, { useState } from 'react';
import { SubmissionReview, AssignmentStatus } from '../types';

const ReviewerPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionReview | null>(null);

  // Mock data representing assignments for a specific reviewer (ID: REV-001)
  const [submissions, setSubmissions] = useState<SubmissionReview[]>([
    {
      id: 'ABS-001',
      title: 'BİLSEM Öğrencilerinde Yapay Zekâ Destekli Resim Analizi',
      author: 'Ahmet Yılmaz',
      reviewerId: 'REV-001',
      assignmentStatus: AssignmentStatus.ASSIGNED,
      scores: { originality: 0, methodology: 0, relevance: 0, scientificQuality: 0 },
      comments: ''
    },
    {
      id: 'ABS-002',
      title: 'Özel Yetenekli Çocuklarda Problem Çözme Becerileri: Bir Meta Analiz',
      author: 'Ayşe Kaya',
      reviewerId: 'REV-001',
      assignmentStatus: AssignmentStatus.ACCEPTED,
      scores: { originality: 4, methodology: 3, relevance: 5, scientificQuality: 4 },
      comments: 'Yöntem kısmı biraz daha detaylandırılabilir.'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bilsem2026') {
      setIsAuthenticated(true);
    } else {
      alert('Geçersiz şifre! (Denemek için: bilsem2026)');
    }
  };

  const handleAssignmentAction = (id: string, action: 'accept' | 'reject') => {
    setSubmissions(submissions.map(s => {
      if (s.id === id) {
        return {
          ...s,
          assignmentStatus: action === 'accept' ? AssignmentStatus.ACCEPTED : AssignmentStatus.REJECTED
        };
      }
      return s;
    }));
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({
        ...selectedSubmission,
        assignmentStatus: action === 'accept' ? AssignmentStatus.ACCEPTED : AssignmentStatus.REJECTED
      });
    }
  };

  const handleScoreChange = (criteria: keyof SubmissionReview['scores'], value: number) => {
    if (!selectedSubmission) return;
    setSelectedSubmission({
      ...selectedSubmission,
      scores: { ...selectedSubmission.scores, [criteria]: value }
    });
  };

  const submitReview = () => {
    if (!selectedSubmission) return;
    setSubmissions(submissions.map(s => s.id === selectedSubmission.id ? { ...selectedSubmission, assignmentStatus: AssignmentStatus.COMPLETED } : s));
    setSelectedSubmission(null);
    alert('Değerlendirme başarıyla kaydedildi.');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-32 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Hakem Girişi</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Lütfen size iletilen hakem şifresi ile giriş yapın.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">Hakem Değerlendirme Paneli</h2>
          <p className="text-gray-500">Hoş geldiniz, Dr. Hasan Akdeniz (Hakem ID: REV-001)</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-red-500 font-bold hover:underline">Çıkış Yap</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Size Atanan Bildiriler</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {submissions.map((sub) => (
              <button 
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className={`w-full text-left p-6 hover:bg-blue-50 transition-colors flex items-start space-x-4 ${selectedSubmission?.id === sub.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${
                  sub.assignmentStatus === AssignmentStatus.ASSIGNED ? 'bg-blue-100 text-blue-700' :
                  sub.assignmentStatus === AssignmentStatus.ACCEPTED ? 'bg-amber-100 text-amber-700' :
                  sub.assignmentStatus === AssignmentStatus.REJECTED ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {sub.assignmentStatus === AssignmentStatus.COMPLETED ? '✓' : sub.assignmentStatus === AssignmentStatus.REJECTED ? '✕' : '?'}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono mb-1">{sub.id}</div>
                  <h4 className="font-bold text-gray-900 leading-tight mb-1">{sub.title}</h4>
                  <div className="text-xs font-bold uppercase tracking-tighter text-gray-400">{sub.assignmentStatus}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4">
              <div className="p-8 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Özet İnceleme</span>
                  <span className="text-gray-400 font-mono text-xs">{selectedSubmission.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedSubmission.title}</h3>
                <div className="p-6 bg-gray-50 rounded-2xl text-gray-700 leading-relaxed italic border border-gray-100 mb-6">
                  "Özet metni burada yer alacaktır..."
                </div>

                {selectedSubmission.assignmentStatus === AssignmentStatus.ASSIGNED && (
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <p className="text-blue-900 font-medium">Bu bildiriyi değerlendirmek için görevi onaylıyor musunuz?</p>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleAssignmentAction(selectedSubmission.id, 'reject')}
                        className="px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50"
                      >
                        Reddet
                      </button>
                      <button 
                        onClick={() => handleAssignmentAction(selectedSubmission.id, 'accept')}
                        className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                      >
                        Kabul Et
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {selectedSubmission.assignmentStatus === AssignmentStatus.ACCEPTED || selectedSubmission.assignmentStatus === AssignmentStatus.COMPLETED ? (
                <div className="p-8 space-y-8">
                  <h4 className="font-bold text-lg text-blue-900 border-l-4 border-blue-600 pl-4">Değerlendirme Formu</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'originality', label: 'Özgünlük' },
                      { key: 'methodology', label: 'Yöntem ve Materyal' },
                      { key: 'relevance', label: 'Tema Uygunluğu' },
                      { key: 'scientificQuality', label: 'Bilimsel Katkı' }
                    ].map((crit) => (
                      <div key={crit.key} className="space-y-3">
                        <label className="text-sm font-bold text-gray-700">{crit.label}</label>
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              disabled={selectedSubmission.assignmentStatus === AssignmentStatus.COMPLETED}
                              onClick={() => handleScoreChange(crit.key as any, val)}
                              className={`w-10 h-10 rounded-lg font-bold transition-all ${selectedSubmission.scores[crit.key as keyof typeof selectedSubmission.scores] === val ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-100 text-gray-400'}`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Görüş ve Öneriler</label>
                    <textarea 
                      rows={4}
                      disabled={selectedSubmission.assignmentStatus === AssignmentStatus.COMPLETED}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Bildiri hakkındaki görüşlerinizi yazın..."
                      value={selectedSubmission.comments}
                      onChange={(e) => setSelectedSubmission({...selectedSubmission, comments: e.target.value})}
                    />
                  </div>

                  {selectedSubmission.assignmentStatus !== AssignmentStatus.COMPLETED && (
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                      <button onClick={() => setSelectedSubmission(null)} className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100">İptal</button>
                      <button onClick={submitReview} className="px-10 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-95">Değerlendirmeyi Tamamla</button>
                    </div>
                  )}
                </div>
              ) : selectedSubmission.assignmentStatus === AssignmentStatus.REJECTED ? (
                <div className="p-16 text-center text-gray-500 italic">
                  Bu görev sizin tarafınızdan reddedilmiştir.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-gray-400">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <p className="font-medium text-lg italic">İncelemek için sol taraftan bir bildiri seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewerPortal;
