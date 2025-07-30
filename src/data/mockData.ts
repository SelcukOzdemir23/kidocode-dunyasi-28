// KidoCode Dünyası Mock Data
// Tüm roller için birbiriyle ilişkili gerçekçi veriler

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'team_leader' | 'teacher' | 'student';
  avatar?: string;
  phone?: string;
  birthDate?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  classId?: string;
  teacherId?: string;
  teamLeaderId?: string;
  enrolledCourses?: string[];
  achievements?: string[];
  points: number;
  level: number;
  bio?: string;
  address?: {
    city: string;
    district: string;
    fullAddress: string;
  };
}

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'programming' | 'design' | 'game_dev' | 'web_dev' | 'robotics';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // hafta
  price: number;
  maxStudents: number;
  currentStudents: number;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
  lessons: Lesson[];
  requirements: string[];
  outcomes: string[];
  teacherId: string;
  ageGroup: string;
  language: 'tr' | 'en';
  tags: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // dakika
  order: number;
  type: 'video' | 'interactive' | 'quiz' | 'project';
  content: string;
  videoUrl?: string;
  resources: Resource[];
  quiz?: Quiz;
  isCompleted?: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image' | 'code' | 'link';
  url: string;
  size?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // dakika
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'coding';
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Group {
  id: string;
  name: string;
  courseId: string;
  teacherId: string;
  students: string[];
  startDate: string;
  endDate: string;
  schedule: Schedule[];
  status: 'active' | 'completed' | 'cancelled';
  maxStudents: number;
  currentStudents: number;
  progress: number;
  nextLesson?: string;
  classroom?: string;
}

export interface Schedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  time: string;
  duration: number; // dakika
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  groupId: string;
  teacherId: string;
  dueDate: string;
  maxPoints: number;
  type: 'individual' | 'group' | 'quiz';
  status: 'draft' | 'published' | 'submitted' | 'graded';
  submissions: Submission[];
  resources: Resource[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  files: Resource[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'late' | 'graded';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'course' | 'participation' | 'excellence' | 'social';
  points: number;
  requirements: string[];
  unlockedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'performance' | 'attendance' | 'financial' | 'course';
  data: any;
  generatedAt: string;
  period: string;
}

// Mock Users Data
export const mockUsers: User[] = [
  // Admin
  {
    id: 'admin-001',
    username: 'admin',
    fullName: 'Ahmet Yılmaz',
    email: 'admin@kidocode.com',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    phone: '+90 532 123 4567',
    joinDate: '2023-01-15',
    status: 'active',
    points: 0,
    level: 10,
    bio: 'Sistem yöneticisi ve kurum müdürü'
  },

  // Team Leaders
  {
    id: 'tl-001',
    username: 'mehmet.ozturk',
    fullName: 'Mehmet Öztürk',
    email: 'mehmet@kidocode.com',
    role: 'team_leader',
    avatar: '/avatars/mehmet.jpg',
    phone: '+90 533 234 5678',
    joinDate: '2023-02-01',
    status: 'active',
    points: 0,
    level: 8,
    bio: 'Ankara bölge koordinatörü',
    address: {
      city: 'Ankara',
      district: 'Çankaya',
      fullAddress: 'Atatürk Bulvarı No:123'
    }
  },
  {
    id: 'tl-002',
    username: 'ayse.demir',
    fullName: 'Ayşe Demir',
    email: 'ayse.demir@kidocode.com',
    role: 'team_leader',
    avatar: '/avatars/ayse.jpg',
    phone: '+90 534 345 6789',
    joinDate: '2023-03-15',
    status: 'active',
    points: 0,
    level: 7,
    bio: 'İstanbul bölge koordinatörü',
    address: {
      city: 'İstanbul',
      district: 'Kadıköy',
      fullAddress: 'Bağdat Caddesi No:456'
    }
  },

  // Teachers
  {
    id: 'teacher-001',
    username: 'fatma.kaya',
    fullName: 'Fatma Kaya',
    email: 'fatma@kidocode.com',
    role: 'teacher',
    avatar: '/avatars/fatma.jpg',
    phone: '+90 535 456 7890',
    birthDate: '1985-06-15',
    joinDate: '2023-04-01',
    status: 'active',
    teamLeaderId: 'tl-001',
    points: 1250,
    level: 6,
    bio: 'Python ve Scratch uzmanı, 5 yıl deneyim'
  },
  {
    id: 'teacher-002',
    username: 'ali.yildiz',
    fullName: 'Ali Yıldız',
    email: 'ali@kidocode.com',
    role: 'teacher',
    avatar: '/avatars/ali.jpg',
    phone: '+90 536 567 8901',
    birthDate: '1990-03-22',
    joinDate: '2023-05-10',
    status: 'active',
    teamLeaderId: 'tl-001',
    points: 980,
    level: 5,
    bio: 'Web geliştirme ve tasarım uzmanı'
  },
  {
    id: 'teacher-003',
    username: 'zeynep.arslan',
    fullName: 'Zeynep Arslan',
    email: 'zeynep@kidocode.com',
    role: 'teacher',
    avatar: '/avatars/zeynep.jpg',
    phone: '+90 537 678 9012',
    birthDate: '1988-11-08',
    joinDate: '2023-06-01',
    status: 'active',
    teamLeaderId: 'tl-002',
    points: 1100,
    level: 6,
    bio: 'Oyun geliştirme ve Kodu uzmanı'
  },

  // Students
  {
    id: 'student-001',
    username: 'ahmet.yilmaz',
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@student.com',
    role: 'student',
    avatar: '/avatars/student-ahmet.jpg',
    phone: '+90 538 789 0123',
    birthDate: '2012-08-15',
    joinDate: '2023-09-01',
    status: 'active',
    classId: 'class-001',
    teacherId: 'teacher-001',
    enrolledCourses: ['course-python-001', 'course-scratch-001'],
    achievements: ['achievement-first-course', 'achievement-participation'],
    points: 1250,
    level: 3,
    bio: 'Python programlama öğrenmeye meraklı'
  },
  {
    id: 'student-002',
    username: 'elif.demir',
    fullName: 'Elif Demir',
    email: 'elif.demir@student.com',
    role: 'student',
    avatar: '/avatars/student-elif.jpg',
    phone: '+90 539 890 1234',
    birthDate: '2011-12-03',
    joinDate: '2023-08-15',
    status: 'active',
    classId: 'class-001',
    teacherId: 'teacher-001',
    enrolledCourses: ['course-python-001', 'course-web-001'],
    achievements: ['achievement-first-course', 'achievement-excellence'],
    points: 1800,
    level: 4,
    bio: 'Web tasarımına ilgi duyuyor'
  },
  {
    id: 'student-003',
    username: 'burak.ozturk',
    fullName: 'Burak Öztürk',
    email: 'burak.ozturk@student.com',
    role: 'student',
    avatar: '/avatars/student-burak.jpg',
    phone: '+90 540 901 2345',
    birthDate: '2013-04-20',
    joinDate: '2023-10-01',
    status: 'active',
    classId: 'class-002',
    teacherId: 'teacher-002',
    enrolledCourses: ['course-scratch-001'],
    achievements: ['achievement-first-course'],
    points: 750,
    level: 2,
    bio: 'Oyun yapmayı seviyor'
  },
  {
    id: 'student-004',
    username: 'deniz.kaya',
    fullName: 'Deniz Kaya',
    email: 'deniz.kaya@student.com',
    role: 'student',
    avatar: '/avatars/student-deniz.jpg',
    phone: '+90 541 012 3456',
    birthDate: '2010-07-10',
    joinDate: '2023-07-01',
    status: 'active',
    classId: 'class-003',
    teacherId: 'teacher-003',
    enrolledCourses: ['course-kodu-001', 'course-python-001'],
    achievements: ['achievement-first-course', 'achievement-social'],
    points: 2100,
    level: 5,
    bio: '3D oyun tasarımına meraklı'
  },
  {
    id: 'student-005',
    username: 'mert.arslan',
    fullName: 'Mert Arslan',
    email: 'mert.arslan@student.com',
    role: 'student',
    avatar: '/avatars/student-mert.jpg',
    phone: '+90 542 123 4567',
    birthDate: '2012-01-25',
    joinDate: '2023-11-01',
    status: 'active',
    classId: 'class-001',
    teacherId: 'teacher-001',
    enrolledCourses: ['course-python-001'],
    achievements: ['achievement-first-course'],
    points: 450,
    level: 1,
    bio: 'Yeni başlayan öğrenci'
  }
];

// Mock Courses Data
export const mockCourses: Course[] = [
  {
    id: 'course-python-001',
    name: 'Python Programlama Temelleri',
    description: 'Çocuklar için Python programlama dili öğrenme kursu. Temel kavramlar, değişkenler, döngüler ve fonksiyonlar.',
    icon: '/assets/python-icon.jpg',
    category: 'programming',
    level: 'beginner',
    duration: 12,
    price: 1200,
    maxStudents: 15,
    currentStudents: 12,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    teacherId: 'teacher-001',
    ageGroup: '10-14 yaş',
    language: 'tr',
    tags: ['python', 'programlama', 'başlangıç'],
    requirements: ['Temel bilgisayar kullanımı', 'Matematik bilgisi'],
    outcomes: ['Python syntax öğrenme', 'Temel programlama mantığı', 'Kendi oyunlarını yapma'],
    lessons: [
      {
        id: 'lesson-python-001-01',
        courseId: 'course-python-001',
        title: 'Python Nedir ve Kurulum',
        description: 'Python programlama dilini tanıma ve geliştirme ortamının kurulumu',
        duration: 45,
        order: 1,
        type: 'video',
        content: 'Python programlama dili hakkında genel bilgi ve kurulum adımları',
        videoUrl: 'https://example.com/videos/python-intro.mp4',
        resources: [
          {
            id: 'resource-001',
            name: 'Python Kurulum Rehberi',
            type: 'pdf',
            url: '/resources/python-setup.pdf',
            size: '2.5 MB'
          }
        ],
        isCompleted: true
      },
      {
        id: 'lesson-python-001-02',
        courseId: 'course-python-001',
        title: 'Değişkenler ve Veri Tipleri',
        description: 'Python\'da değişken tanımlama ve farklı veri tiplerini öğrenme',
        duration: 60,
        order: 2,
        type: 'interactive',
        content: 'String, integer, float veri tipleri ve değişken tanımlama',
        resources: [
          {
            id: 'resource-002',
            name: 'Değişkenler Alıştırması',
            type: 'code',
            url: '/resources/variables-exercise.py'
          }
        ],
        isCompleted: true
      },
      {
        id: 'lesson-python-001-03',
        courseId: 'course-python-001',
        title: 'Döngüler ve Koşullar',
        description: 'For ve while döngüleri, if-else koşulları',
        duration: 75,
        order: 3,
        type: 'interactive',
        content: 'Döngü mantığı ve koşul ifadeleri',
        resources: [],
        isCompleted: false
      }
    ]
  },
  {
    id: 'course-scratch-001',
    name: 'Scratch ile Oyun Geliştirme',
    description: 'Scratch platformu kullanarak interaktif oyunlar ve animasyonlar oluşturma',
    icon: '/assets/scratch-icon.jpg',
    category: 'game_dev',
    level: 'beginner',
    duration: 8,
    price: 800,
    maxStudents: 12,
    currentStudents: 8,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-03-30',
    teacherId: 'teacher-001',
    ageGroup: '8-12 yaş',
    language: 'tr',
    tags: ['scratch', 'oyun', 'animasyon'],
    requirements: ['Temel bilgisayar kullanımı'],
    outcomes: ['Blok tabanlı programlama', 'Oyun tasarımı', 'Animasyon yapma'],
    lessons: [
      {
        id: 'lesson-scratch-001-01',
        courseId: 'course-scratch-001',
        title: 'Scratch Arayüzünü Tanıma',
        description: 'Scratch editörünün temel özelliklerini öğrenme',
        duration: 30,
        order: 1,
        type: 'video',
        content: 'Scratch platformu tanıtımı ve arayüz kullanımı',
        videoUrl: 'https://example.com/videos/scratch-intro.mp4',
        resources: [],
        isCompleted: true
      }
    ]
  },
  {
    id: 'course-web-001',
    name: 'Web Tasarım Temelleri',
    description: 'HTML, CSS ve JavaScript ile modern web siteleri tasarlama',
    icon: '/assets/web-dev-icon.jpg',
    category: 'web_dev',
    level: 'intermediate',
    duration: 10,
    price: 1000,
    maxStudents: 10,
    currentStudents: 6,
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2024-03-30',
    teacherId: 'teacher-002',
    ageGroup: '12-16 yaş',
    language: 'tr',
    tags: ['html', 'css', 'javascript', 'web'],
    requirements: ['Temel bilgisayar kullanımı', 'İngilizce temel bilgisi'],
    outcomes: ['HTML yapısı oluşturma', 'CSS ile stil verme', 'JavaScript ile etkileşim'],
    lessons: []
  },
  {
    id: 'course-kodu-001',
    name: 'Kodu Game Lab ile 3D Oyun',
    description: 'Microsoft Kodu Game Lab kullanarak 3D oyunlar tasarlama ve programlama',
    icon: '/assets/kodu-icon.jpg',
    category: 'game_dev',
    level: 'advanced',
    duration: 12,
    price: 1400,
    maxStudents: 8,
    currentStudents: 5,
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    teacherId: 'teacher-003',
    ageGroup: '12-16 yaş',
    language: 'tr',
    tags: ['kodu', '3d', 'oyun', 'gelişmiş'],
    requirements: ['Temel programlama bilgisi', '3D düşünme yeteneği'],
    outcomes: ['3D oyun tasarımı', 'Görsel programlama', 'Oyun mekaniği'],
    lessons: []
  },
  {
    id: 'course-design-001',
    name: 'Dijital Tasarım ve Grafik',
    description: 'GIMP ve diğer araçlarla dijital tasarım ve grafik oluşturma',
    icon: '/assets/design-icon.jpg',
    category: 'design',
    level: 'intermediate',
    duration: 8,
    price: 900,
    maxStudents: 10,
    currentStudents: 4,
    status: 'active',
    startDate: '2024-02-15',
    endDate: '2024-04-15',
    teacherId: 'teacher-002',
    ageGroup: '10-15 yaş',
    language: 'tr',
    tags: ['tasarım', 'grafik', 'gimp'],
    requirements: ['Temel bilgisayar kullanımı', 'Yaratıcılık'],
    outcomes: ['Grafik tasarım', 'Logo tasarımı', 'Dijital sanat'],
    lessons: []
  }
];

// Mock Groups Data
export const mockGroups: Group[] = [
  {
    id: 'group-001',
    name: 'TUR_PRE_8_PYTHON_2024',
    courseId: 'course-python-001',
    teacherId: 'teacher-001',
    students: ['student-001', 'student-002', 'student-005'],
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'active',
    maxStudents: 15,
    currentStudents: 3,
    progress: 65,
    nextLesson: '2024-02-20 14:00',
    classroom: 'A101',
    schedule: [
      {
        day: 'tuesday',
        time: '14:00',
        duration: 90
      },
      {
        day: 'thursday',
        time: '14:00',
        duration: 90
      }
    ]
  },
  {
    id: 'group-002',
    name: 'TUR_BEG_10_SCRATCH_2024',
    courseId: 'course-scratch-001',
    teacherId: 'teacher-001',
    students: ['student-003'],
    startDate: '2024-02-01',
    endDate: '2024-03-30',
    status: 'active',
    maxStudents: 12,
    currentStudents: 1,
    progress: 40,
    nextLesson: '2024-02-22 16:00',
    classroom: 'B203',
    schedule: [
      {
        day: 'thursday',
        time: '16:00',
        duration: 60
      }
    ]
  },
  {
    id: 'group-003',
    name: 'TUR_ADV_12_KODU_2024',
    courseId: 'course-kodu-001',
    teacherId: 'teacher-003',
    students: ['student-004'],
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    status: 'active',
    maxStudents: 8,
    currentStudents: 1,
    progress: 75,
    nextLesson: '2024-02-21 15:00',
    classroom: 'C305',
    schedule: [
      {
        day: 'wednesday',
        time: '15:00',
        duration: 120
      }
    ]
  }
];

// Mock Assignments Data
export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-001',
    title: 'Python Değişkenler Ödevi',
    description: 'Python\'da değişken tanımlama ve farklı veri tiplerini kullanarak basit bir hesap makinesi yapma',
    courseId: 'course-python-001',
    groupId: 'group-001',
    teacherId: 'teacher-001',
    dueDate: '2024-02-15',
    maxPoints: 100,
    type: 'individual',
    status: 'published',
    resources: [
      {
        id: 'resource-assignment-001',
        name: 'Ödev Açıklaması',
        type: 'pdf',
        url: '/assignments/python-variables.pdf'
      }
    ],
    submissions: [
      {
        id: 'submission-001',
        assignmentId: 'assignment-001',
        studentId: 'student-001',
        submittedAt: '2024-02-14T15:30:00Z',
        files: [
          {
            id: 'file-001',
            name: 'hesap_makinesi.py',
            type: 'code',
            url: '/submissions/hesap_makinesi.py'
          }
        ],
        grade: 95,
        feedback: 'Çok güzel bir çalışma! Değişkenleri doğru kullanmışsın.',
        status: 'graded'
      },
      {
        id: 'submission-002',
        assignmentId: 'assignment-001',
        studentId: 'student-002',
        submittedAt: '2024-02-15T10:15:00Z',
        files: [
          {
            id: 'file-002',
            name: 'calculator.py',
            type: 'code',
            url: '/submissions/calculator.py'
          }
        ],
        grade: 88,
        feedback: 'İyi çalışma, ancak hata kontrolü ekleyebilirsin.',
        status: 'graded'
      }
    ]
  },
  {
    id: 'assignment-002',
    title: 'Scratch Karakter Animasyonu',
    description: 'Scratch\'te bir karakter oluşturup basit animasyonlar yapma',
    courseId: 'course-scratch-001',
    groupId: 'group-002',
    teacherId: 'teacher-001',
    dueDate: '2024-02-20',
    maxPoints: 80,
    type: 'individual',
    status: 'published',
    resources: [
      {
        id: 'resource-assignment-002',
        name: 'Animasyon Rehberi',
        type: 'pdf',
        url: '/assignments/scratch-animation.pdf'
      }
    ],
    submissions: [
      {
        id: 'submission-003',
        assignmentId: 'assignment-002',
        studentId: 'student-003',
        submittedAt: '2024-02-19T16:45:00Z',
        files: [
          {
            id: 'file-003',
            name: 'karakter_animasyonu.sb3',
            type: 'code',
            url: '/submissions/karakter_animasyonu.sb3'
          }
        ],
        grade: 75,
        feedback: 'Güzel animasyon, daha fazla hareket ekleyebilirsin.',
        status: 'graded'
      }
    ]
  }
];

// Mock Achievements Data
export const mockAchievements: Achievement[] = [
  {
    id: 'achievement-first-course',
    name: 'İlk Kurs',
    description: 'İlk kursunu tamamladın!',
    icon: '🎓',
    category: 'course',
    points: 100,
    requirements: ['Bir kursu tamamlama'],
    unlockedAt: '2024-01-30'
  },
  {
    id: 'achievement-participation',
    name: 'Aktif Katılımcı',
    description: '5 derste aktif katılım gösterdin',
    icon: '🌟',
    category: 'participation',
    points: 50,
    requirements: ['5 derste aktif katılım']
  },
  {
    id: 'achievement-excellence',
    name: 'Mükemmellik',
    description: 'Bir ödevde 95+ puan aldın',
    icon: '🏆',
    category: 'excellence',
    points: 200,
    requirements: ['95+ puan alma']
  },
  {
    id: 'achievement-social',
    name: 'Sosyal Kelebek',
    description: '10 arkadaşınla etkileşimde bulundun',
    icon: '🦋',
    category: 'social',
    points: 75,
    requirements: ['10 arkadaşla etkileşim']
  },
  {
    id: 'achievement-python-master',
    name: 'Python Ustası',
    description: 'Python kursunu mükemmel şekilde tamamladın',
    icon: '🐍',
    category: 'course',
    points: 300,
    requirements: ['Python kursunu tamamlama', 'Tüm ödevleri yapma']
  }
];

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'student-001',
    title: 'Yeni Ödev',
    message: 'Python Değişkenler Ödevi yayınlandı. Son teslim tarihi: 15 Şubat',
    type: 'info',
    isRead: false,
    createdAt: '2024-02-10T09:00:00Z',
    actionUrl: '/student/assignments'
  },
  {
    id: 'notif-002',
    userId: 'student-001',
    title: 'Ödev Değerlendirildi',
    message: 'Python Değişkenler Ödevi değerlendirildi. Puanınız: 95/100',
    type: 'success',
    isRead: true,
    createdAt: '2024-02-14T16:30:00Z',
    actionUrl: '/student/assignments'
  },
  {
    id: 'notif-003',
    userId: 'teacher-001',
    title: 'Yeni Öğrenci',
    message: 'Mert Arslan Python kursuna kayıt oldu',
    type: 'info',
    isRead: false,
    createdAt: '2024-02-12T11:15:00Z',
    actionUrl: '/teacher/groups'
  }
];

// Mock Reports Data
export const mockReports: Report[] = [
  {
    id: 'report-001',
    title: 'Ocak 2024 Performans Raporu',
    type: 'performance',
    data: {
      totalStudents: 25,
      activeStudents: 22,
      averageProgress: 68,
      topCourses: ['Python Programlama', 'Scratch ile Oyun Geliştirme'],
      completionRate: 85
    },
    generatedAt: '2024-02-01T00:00:00Z',
    period: '2024-01'
  },
  {
    id: 'report-002',
    title: 'Öğretmen Performans Raporu',
    type: 'performance',
    data: {
      teacherId: 'teacher-001',
      totalStudents: 12,
      averageGrade: 87,
      courseCompletionRate: 92,
      studentSatisfaction: 4.5
    },
    generatedAt: '2024-02-01T00:00:00Z',
    period: '2024-01'
  }
];

// Helper Functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getGroupById = (id: string): Group | undefined => {
  return mockGroups.find(group => group.id === id);
};

export const getAssignmentById = (id: string): Assignment | undefined => {
  return mockAssignments.find(assignment => assignment.id === id);
};

export const getUsersByRole = (role: User['role']): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getStudentsByTeacher = (teacherId: string): User[] => {
  return mockUsers.filter(user => user.role === 'student' && user.teacherId === teacherId);
};

export const getGroupsByTeacher = (teacherId: string): Group[] => {
  return mockGroups.filter(group => group.teacherId === teacherId);
};

export const getCoursesByTeacher = (teacherId: string): Course[] => {
  return mockCourses.filter(course => course.teacherId === teacherId);
};

export const getAssignmentsByTeacher = (teacherId: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.teacherId === teacherId);
};

export const getNotificationsByUser = (userId: string): Notification[] => {
  return mockNotifications.filter(notification => notification.userId === userId);
};

export const getAchievementsByUser = (userId: string): Achievement[] => {
  const user = getUserById(userId);
  if (!user?.achievements) return [];
  return mockAchievements.filter(achievement => user.achievements!.includes(achievement.id));
};

// Demo login credentials
export const demoCredentials = {
  admin: { username: 'admin', password: '123456' },
  teamLeader: { username: 'mehmet.ozturk', password: '123456' },
  teacher: { username: 'fatma.kaya', password: '123456' },
  student: { username: 'ahmet.yilmaz', password: '123456' }
}; 