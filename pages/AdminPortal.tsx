
import React, { useState, useEffect } from 'react';
import { SubmissionReview, Reviewer, AssignmentStatus } from '../types';
import { databaseService } from '../services/databaseService';

const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionReview[]>([]);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [reviewersData, submissionsData] = await Promise.all([
        databaseService.getReviewers(),
        databaseService.getAssignmentsWithDetails(),
      ]);
      setReviewers(reviewersData);
      setSubmissions(submissionsData);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2026') {
      setIsAuthenticated(true);
    } else {
      alert('Hatalı şifre! (Denemek için: admin2026)');
    }
  };

  const assignReviewer = async (reviewerId: string) => {
    if (!selectedSubId) return;
    try {
      await databaseService.assignReviewer(selectedSubId, reviewerId);
      setSubmissions(submissions.map(s => {
        if (s.id === selectedSubId) {
          return { ...s, reviewerId, assignmentStatus: AssignmentStatus.ASSIGNED };
        }
        return s;
      }));
      setSelectedSubId(null);
      alert('Bildiri hakeme başarıyla atandı.');
    } catch (err) {
      console.error(err);
      alert('Hata: Bildiri atanırken bir sorun oluştu.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-32 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Yönetici Paneli</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Yönetici Şifresi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Hata</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadData}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Bildiri Atama ve İzleme Sistemi</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submission List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-gray-50 border-b font-bold text-gray-700">Tüm Bildiriler</div>
          <div className="divide-y divide-gray-100">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-blue-600 font-mono font-bold uppercase tracking-wider">{sub.id}</span>
                    <h4 className="font-bold text-gray-900">{sub.title}</h4>
                    <p className="text-sm text-gray-500">Yazar: {sub.author}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                    sub.assignmentStatus === AssignmentStatus.UNASSIGNED ? 'bg-gray-100 text-gray-600 border-gray-200' :
                    sub.assignmentStatus === AssignmentStatus.COMPLETED ? 'bg-green-100 text-green-700 border-green-200' :
                    'bg-blue-100 text-blue-700 border-blue-200'
                  }`}>
                    {sub.assignmentStatus}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  {sub.reviewerId ? (
                    <div className="text-xs text-gray-400">
                      Atanan Hakem: <span className="font-bold text-gray-600">{reviewers.find(r => r.id === sub.reviewerId)?.name}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-500 font-bold italic">Henüz atanmadı</div>
                  )}
                  
                  {sub.assignmentStatus === AssignmentStatus.UNASSIGNED || sub.assignmentStatus === AssignmentStatus.REJECTED ? (
                    <button 
                      onClick={() => setSelectedSubId(sub.id)}
                      className="text-xs font-bold bg-blue-900 text-white px-3 py-1.5 rounded-lg"
                    >
                      Hakem Ata
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div>
          {selectedSubId ? (
            <div className="bg-white rounded-3xl border border-blue-100 shadow-xl p-8 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-blue-900">Hakem Seçin</h3>
                <button onClick={() => setSelectedSubId(null)} className="text-gray-400">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-6">"{submissions.find(s => s.id === selectedSubId)?.title}" bildirisi için uygun hakemi seçin.</p>
              
              <div className="space-y-3">
                {reviewers.map(rev => (
                  <button 
                    key={rev.id}
                    onClick={() => assignReviewer(rev.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                  >
                    <div>
                      <div className="font-bold text-gray-900">{rev.name}</div>
                      <div className="text-xs text-gray-400">{rev.expertise}</div>
                    </div>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-blue-900 text-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-2xl h-full">
               <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
               </div>
               <h3 className="text-2xl font-bold mb-4">Sistem İstatistikleri</h3>
               <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="text-3xl font-black">12</div>
                    <div className="text-[10px] uppercase font-bold text-blue-300">Toplam Bildiri</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="text-3xl font-black">4</div>
                    <div className="text-[10px] uppercase font-bold text-blue-300">Aktif Hakem</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="text-3xl font-black">33%</div>
                    <div className="text-[10px] uppercase font-bold text-blue-300">Atama Oranı</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="text-3xl font-black">0</div>
                    <div className="text-[10px] uppercase font-bold text-blue-300">Tamamlanan</div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
