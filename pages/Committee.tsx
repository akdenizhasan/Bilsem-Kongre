
import React from 'react';

const Committee: React.FC = () => {
  const committeeGroups = [
    { role: 'Bilim Kurulu Koordinatörü', names: ['Dr. Hasan Akdeniz'] },
    { role: 'Sekretarya', names: ['Dr. Seher Pervan', 'Dr. Özgül Yayla'] },
    { role: 'Program Sorumlusu', names: ['Dr. Sinan Aksoy'] },
    { role: 'Teknik / Lojistik', names: ['Vedat Kabasakal', 'Dr. Deniz Fırat'] },
    { role: 'İletişim ve Duyuru', names: ['Dr. Seher Pervan', 'Murat Tuncar'] },
    { role: 'Finans ve Sponsorluk', names: ['Murat Tuncar'] },
    { role: 'Bilim Kurulu Üyeleri', names: ['Dr. Çiğdem Akkanat', 'Dr. Sultan Yıldırım'] }
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-950">Kurullar</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Kongremizin akademik ve operasyonel süreçlerini yürüten değerli kurul üyelerimiz.</p>
      </div>
      
      {/* Top Chairs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[120px] flex items-center justify-end p-6 text-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.827a1 1 0 00-.788 0l-7 3a1 1 0 000 1.848l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.848l-7-3zM14 9.581l-4 1.714-4-1.714V13l4 1.714L14 13V9.581z" /></svg>
          </div>
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Onursal Başkan</h3>
          <p className="text-4xl font-bold text-gray-900">Adnan Beker</p>
        </section>

        <section className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[120px] flex items-center justify-end p-6 text-amber-200 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" /></svg>
          </div>
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-6">Kongre Başkanı</h3>
          <p className="text-4xl font-bold text-gray-900">Selma Köseoğlu</p>
        </section>
      </div>

      {/* Other Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {committeeGroups.map((group, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="font-bold">{idx + 1}</span>
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-3">{group.role}</h4>
            <ul className="space-y-3">
              {group.names.map((name, i) => (
                <li key={i} className="text-gray-900 font-bold text-lg flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Committee;
