# Mock Data Kullanım Kılavuzu

Bu dosya, KidoCode Dünyası projesi için oluşturulan kapsamlı mock data'nın nasıl kullanılacağını açıklar.

## 📁 Dosya Yapısı

```
src/data/
├── mockData.ts      # Ana mock data dosyası
└── README.md        # Bu dosya
```

## 🎯 Mock Data İçeriği

### Kullanıcı Rolleri
- **Admin**: Sistem yöneticisi
- **Team Leader**: Takım lideri/koordinatör  
- **Teacher**: Öğretmen
- **Student**: Öğrenci

### Veri Tipleri
- **Users**: Tüm kullanıcılar
- **Courses**: Kurslar ve dersler
- **Groups**: Öğrenci grupları
- **Assignments**: Ödevler ve gönderimler
- **Achievements**: Başarımlar ve rozetler
- **Notifications**: Bildirimler
- **Reports**: Raporlar

## 🔐 Demo Giriş Bilgileri

```typescript
// Demo kullanıcı bilgileri
const demoCredentials = {
  admin: { username: 'admin', password: '123456' },
  teamLeader: { username: 'mehmet.ozturk', password: '123456' },
  teacher: { username: 'fatma.kaya', password: '123456' },
  student: { username: 'ahmet.yilmaz', password: '123456' }
};
```

## 📊 Veri İlişkileri

### Öğrenci Verileri
- **Ahmet Yılmaz** (student-001)
  - Python Programlama kursuna kayıtlı
  - Scratch ile Oyun Geliştirme kursuna kayıtlı
  - 1250 puan, 3. seviye
  - 2 başarım kazanmış

- **Elif Demir** (student-002)
  - Python Programlama kursuna kayıtlı
  - Web Tasarım Temelleri kursuna kayıtlı
  - 1800 puan, 4. seviye
  - 2 başarım kazanmış

### Öğretmen Verileri
- **Fatma Kaya** (teacher-001)
  - Python Programlama kursunu veriyor
  - Scratch ile Oyun Geliştirme kursunu veriyor
  - 1250 puan, 6. seviye

- **Ali Yıldız** (teacher-002)
  - Web Tasarım Temelleri kursunu veriyor
  - Dijital Tasarım ve Grafik kursunu veriyor
  - 980 puan, 5. seviye

### Grup Verileri
- **TUR_PRE_8_PYTHON_2024**: Python kursu grubu
- **TUR_BEG_10_SCRATCH_2024**: Scratch kursu grubu
- **TUR_ADV_12_KODU_2024**: Kodu kursu grubu

## 🛠️ Kullanım Örnekleri

### Kullanıcı İşlemleri
```typescript
import { getUserById, getUsersByRole } from '@/data/mockData';

// Belirli bir kullanıcıyı getir
const user = getUserById('student-001');

// Belirli roldeki tüm kullanıcıları getir
const students = getUsersByRole('student');
```

### Kurs İşlemleri
```typescript
import { getCourseById, mockCourses } from '@/data/mockData';

// Belirli bir kursu getir
const course = getCourseById('course-python-001');

// Tüm kursları listele
const allCourses = mockCourses;
```

### Öğretmen İşlemleri
```typescript
import { getGroupsByTeacher, getCoursesByTeacher } from '@/data/mockData';

// Öğretmenin gruplarını getir
const teacherGroups = getGroupsByTeacher('teacher-001');

// Öğretmenin kurslarını getir
const teacherCourses = getCoursesByTeacher('teacher-001');
```

### Öğrenci İşlemleri
```typescript
import { getStudentsByTeacher, getAchievementsByUser } from '@/data/mockData';

// Öğretmenin öğrencilerini getir
const students = getStudentsByTeacher('teacher-001');

// Öğrencinin başarımlarını getir
const achievements = getAchievementsByUser('student-001');
```

## 🔄 Veri Güncelleme

Mock data'yı güncellemek için:

1. `mockData.ts` dosyasını açın
2. İlgili array'i düzenleyin (mockUsers, mockCourses, vb.)
3. Yeni veriler ekleyin veya mevcut verileri güncelleyin
4. İlişkili ID'leri doğru şekilde bağladığınızdan emin olun

## 📝 Notlar

- Tüm tarihler ISO 8601 formatında (YYYY-MM-DD)
- ID'ler benzersiz olmalı
- İlişkili veriler arasında tutarlılık sağlanmalı
- Demo amaçlı olduğu için gerçek verilerle değiştirilecek

## 🚀 Gelecek Geliştirmeler

- [ ] Daha fazla demo kullanıcı ekleme
- [ ] Daha fazla kurs ve ders ekleme
- [ ] Gerçek zamanlı veri simülasyonu
- [ ] API endpoint'leri ile uyumlu hale getirme 