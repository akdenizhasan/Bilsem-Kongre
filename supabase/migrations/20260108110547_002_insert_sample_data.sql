/*
  # Insert Sample Data

  Insert initial reviewers and submissions for demonstration
*/

-- Insert sample reviewers
INSERT INTO reviewers (id, name, expertise) VALUES
('REV-001', 'Dr. Hasan Akdeniz', 'Yapay Zeka, Bilişim'),
('REV-002', 'Dr. Seher Pervan', 'Psikoloji, Eğitim'),
('REV-003', 'Dr. Sinan Aksoy', 'Fen Bilimleri, Mühendislik'),
('REV-004', 'Dr. Özgül Yayla', 'Görsel Sanatlar')
ON CONFLICT (id) DO NOTHING;

-- Insert sample submissions
INSERT INTO submissions (id, title, author, abstract) VALUES
('ABS-101', 'Üstün Yetenekli Çocuklarda Algoritmik Düşünme', 'Cemre Deniz', 'Bu çalışma algoritmik düşünmenin geliştirilmesi üzerine odaklanmaktadır.'),
('ABS-102', 'Yapay Zeka Destekli BİLSEM Müfredatı', 'Barış Bulut', 'Yapay zeka teknolojilerinin eğitim müfredatına entegrasyonu hakkında araştırma.'),
('ABS-103', 'Sanat ve Teknoloji Entegrasyonu', 'Selin Şen', 'Sanat eğitiminde teknoloji kullanımının etkileri.'),
('ABS-004', 'BİLSEM Öğrencilerinde Yapay Zekâ Destekli Resim Analizi', 'Ahmet Yılmaz', 'Yapay zeka teknolojilerini kullanarak resim analizi.'),
('ABS-005', 'Özel Yetenekli Çocuklarda Problem Çözme Becerileri: Bir Meta Analiz', 'Ayşe Kaya', 'Problem çözme becerilerinin geliştirilmesi üzerine meta-analiz çalışması.')
ON CONFLICT (id) DO NOTHING;

-- Insert sample assignments
INSERT INTO assignment_reviews (submission_id, reviewer_id, assignment_status, originality_score, methodology_score, relevance_score, scientific_quality_score, comments) VALUES
('ABS-103', 'REV-001', 'ASSIGNED', 0, 0, 0, 0, ''),
('ABS-004', 'REV-001', 'ACCEPTED', 0, 0, 0, 0, ''),
('ABS-005', 'REV-001', 'COMPLETED', 4, 3, 5, 4, 'Yöntem kısmı biraz daha detaylandırılabilir.')
ON CONFLICT DO NOTHING;