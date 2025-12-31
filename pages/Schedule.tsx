import React, { useState, useEffect } from 'react';

interface Event {
  time: string;
  title: string;
  location: string;
  speaker?: string;
  type: 'plenary' | 'break' | 'parallel' | 'ceremony';
  description?: string;
  bio?: string;
}

const scheduleData: Record<number, Event[]> = {
  1: [
    { 
      time: '09:00 - 10:00', 
      title: 'Kayıt ve Karşılama', 
      location: 'Giriş Holü', 
      type: 'ceremony',
      description: 'Katılımcıların kongre kitlerini teslim almaları ve kayıt işlemlerini tamamlamaları için ayrılan süredir.'
    },
    { 
      time: '10:00 - 11:30', 
      title: 'Açılış Töreni ve Protokol Konuşmaları', 
      location: 'Büyük Salon', 
      type: 'ceremony',
      description: 'Kongre açılış konuşmaları, protokol selamlamaları ve kongre genel vizyonunun paylaşılacağı resmi açılış oturumu.'
    },
    { time: '11:30 - 12:00', title: 'Kahve Molası', location: 'Fuaye Alanı', type: 'break' },
    { 
      time: '12:00 - 13:00', 
      title: 'Açılış Konferansı: Özel Yetenekli Eğitiminde Yeni Paradigmalar', 
      location: 'Büyük Salon', 
      speaker: 'Prof. Dr. Ahmet Yılmaz', 
      type: 'plenary',
      description: 'Bu oturumda, 21. yüzyıl becerileri ve yapay zeka çağında özel yetenekli öğrencilerin eğitimindeki paradigma değişimleri ele alınacaktır. Modern yaklaşımların Bilim ve Sanat Merkezi müfredatına entegrasyonu üzerine kritik bir değerlendirme yapılacaktır.',
      bio: 'Prof. Dr. Ahmet Yılmaz, Gazi Üniversitesi Eğitim Bilimleri Enstitüsü müdürüdür. Özel yetenekliler eğitimi ve üstün zekâlılar üzerine 20 yılı aşkın akademik kariyere ve çok sayıda uluslararası yayına sahiptir.'
    },
    { time: '13:00 - 14:00', title: 'Öğle Yemeği', location: 'Kongre Restoranı', type: 'break' },
    { 
      time: '14:00 - 15:30', 
      title: 'Paralel Oturumlar - I', 
      location: 'Salon A, B, C', 
      type: 'parallel',
      description: 'Üç ayrı salonda eş zamanlı olarak yürütülecek olan bildiri sunumları. Katılımcılar ilgi alanlarına göre diledikleri salona katılabilirler.'
    },
    { time: '15:30 - 16:00', title: 'Kahve Molası', location: 'Fuaye Alanı', type: 'break' },
    { 
      time: '16:00 - 17:30', 
      title: 'Paralel Oturumlar - II', 
      location: 'Salon A, B, C', 
      type: 'parallel',
      description: 'Öğleden sonraki bildiri sunum serisi. Sosyal bilimler, fen bilimleri ve görsel sanatlar odaklı sunumlar gerçekleştirilecektir.'
    },
  ],
  2: [
    { 
      time: '09:00 - 10:30', 
      title: 'Panel: Bilim ve Sanat Merkezlerinde Dijital Dönüşüm', 
      location: 'Büyük Salon', 
      speaker: 'Panelistler: Doç. Dr. Hasan Akdeniz, Dr. Elif Can', 
      type: 'plenary',
      description: 'Yapay zeka araçlarının Bilim ve Sanat Merkezi eğitim süreçlerine nasıl entegre edilebileceği, dijital okuryazarlık ve geleceğin öğrenme ortamları üzerine uzman görüşleri.',
      bio: 'Doç. Dr. Hasan Akdeniz, eğitim teknolojileri ve yapay zeka alanında uzmanlaşmış bir araştırmacıdır. Dr. Elif Can ise Millî Eğitim Bakanlığı bünyesinde dijital içerik geliştirme projelerinde yer almaktadır.'
    },
    { time: '10:30 - 11:00', title: 'Kahve Molası', location: 'Fuaye Alanı', type: 'break' },
    { 
      time: '11:00 - 12:30', 
      title: 'Paralel Oturumlar - III', 
      location: 'Salon A, B, C', 
      type: 'parallel',
      description: 'İkinci günün ilk bildiri sunum oturumları. Uygulamalı atölye sonuçları ve saha araştırmaları sunulacaktır.'
    },
    { time: '12:30 - 14:00', title: 'Öğle Yemeği', location: 'Kongre Restoranı', type: 'break' },
    { 
      time: '14:00 - 15:30', 
      title: 'Atölye Çalışmaları ve Poster Sunumları', 
      location: 'Atölye Salonu & Galeri', 
      type: 'parallel',
      description: 'TÜBİTAK projeleri, Erasmus+ fikirleri ve görsel sanatlar posterlerinin eş zamanlı sergilendiği ve tartışıldığı uygulama oturumu.'
    },
    { time: '15:30 - 16:00', title: 'Kahve Molası', location: 'Fuaye Alanı', type: 'break' },
    { 
      time: '16:00 - 17:30', 
      title: 'En İyi Bildiri Ödülleri ve Kapanış Paneli', 
      location: 'Büyük Salon', 
      type: 'ceremony',
      description: 'Kongre boyunca sunulan en nitelikli çalışmaların ödüllendirilmesi ve kongre genel sonuçlarının değerlendirilerek kapanışın gerçekleştirilmesi.'
    },
    { time: '17:30 - 18:30', title: 'Veda Yemeği ve Kapanış', location: 'Kongre Restoranı', type: 'break' },
  ]
};

const Schedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setExpandedIndex(null);
  }, [activeDay]);

  const getTypeStyle = (type: Event['type']) => {
    switch (type) {
      case 'plenary': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'break': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'parallel': return 'bg-green-100 text-green-800 border-green-200';
      case 'ceremony': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Kongre Programı</h2>
        <p className="text-gray-600">12-13 Haziran 2026 tarihlerindeki bilimsel program akışı.</p>
      </div>
      <div className="flex justify-center mb-10 space-x-2 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
        {[1, 2].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-8 py-3 rounded-lg font-bold transition-all ${
              activeDay === day 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {day}. Gün
            <span className="block text-[10px] font-normal opacity-70">
              {day === 1 ? '12 Haziran' : '13 Haziran'}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        {scheduleData[activeDay].map((event, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div 
              onClick={() => toggleExpand(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer border border-white transition-all duration-300 ${expandedIndex === index ? 'bg-blue-600 scale-125' : 'bg-blue-900'} text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div 
              onClick={() => toggleExpand(index)}
              className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border transition-all cursor-pointer ${
                expandedIndex === index 
                  ? 'border-blue-200 bg-blue-50 shadow-xl ring-2 ring-blue-100' 
                  : 'border-gray-100 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between mb-2">
                <time className={`font-bold text-lg ${expandedIndex === index ? 'text-blue-700' : 'text-blue-600'}`}>{event.time}</time>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${getTypeStyle(event.type)}`}>
                  {event.type}
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-1 transition-colors ${expandedIndex === index ? 'text-blue-900' : 'text-gray-900'}`}>{event.title}</h3>
              {event.speaker && (
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {event.speaker}
                </p>
              )}
              <p className="text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </p>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedIndex === index ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 border-t border-blue-200/50 space-y-4">
                  {event.description && (
                    <div>
                      <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Oturum Hakkında</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  )}
                  {event.bio && (
                    <div>
                      <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">Konuşmacı Özgeçmişi</h4>
                      <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-blue-300 pl-3">{event.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;