
import React from 'react';

const Dates: React.FC = () => {
  const dates = [
    { step: 'Bildiri Özeti Son Gönderim', date: '20 Mart 2026', icon: '📩', status: 'upcoming' },
    { step: 'Kabul Duyurusu', date: '13 Nisan 2026', icon: '📢', status: 'upcoming' },
    { step: 'Tam Metin / Poster Teslimi', date: '10 Mayıs 2026', icon: '📄', status: 'upcoming' },
    { step: 'Kongre Tarihi', date: '12-13 Haziran 2026', icon: '🗓️', status: 'highlight' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-950">Önemli Tarihler</h2>
        <p className="text-gray-500">Kongre sürecindeki kritik aşamalar ve son başvuru tarihleri.</p>
      </div>

      <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-blue-900/40">Aşama</th>
              <th className="px-8 py-6 text-sm font-bold uppercase tracking-widest text-blue-900/40 text-right">Tarih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {dates.map((item, idx) => (
              <tr 
                key={idx} 
                className={`group transition-colors hover:bg-blue-50/30 ${item.status === 'highlight' ? 'bg-blue-50/50' : ''}`}
              >
                <td className="px-8 py-8">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className={`text-lg font-semibold ${item.status === 'highlight' ? 'text-blue-900' : 'text-gray-800'}`}>
                      {item.step}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-8 text-right">
                  <span className={`text-xl font-black tabular-nums ${item.status === 'highlight' ? 'text-blue-600' : 'text-gray-900'}`}>
                    {item.date}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-8 bg-amber-50 rounded-[24px] border border-amber-100 flex items-start space-x-4">
        <div className="w-12 h-12 bg-amber-200/50 rounded-2xl flex items-center justify-center text-amber-700 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-amber-900 mb-1">Zamanlama Hakkında Not</h4>
          <p className="text-amber-800/80 text-sm leading-relaxed">
            Belirtilen tarihler Türkiye Saati (TSİ) ile 23:59'a kadar geçerlidir. Bildiri gönderim yoğunluğu nedeniyle sistemsel gecikmeler yaşanabileceğini hatırlatır, başvurularınızı son güne bırakmamanızı tavsiye ederiz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dates;
