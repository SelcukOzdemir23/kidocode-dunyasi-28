import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Star,
  Play,
  Users,
  Target,
  Award
} from 'lucide-react';
import { 
  mockCourses, 
  mockGroups, 
  mockAssignments, 
  mockAchievements,
  getCourseById,
  getGroupsByTeacher,
  getAssignmentsByTeacher,
  getAchievementsByUser
} from '@/data/mockData';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Öğrencinin kayıtlı olduğu kursları al
  const enrolledCourses = user?.enrolledCourses?.map(courseId => {
    const course = getCourseById(courseId);
    if (!course) return null;
    
    // Kursun gruplarını bul ve öğrencinin bulunduğu grubu bul
    const studentGroups = mockGroups.filter(group => 
      group.courseId === courseId && 
      group.students.includes(user.id)
    );
    
    const group = studentGroups[0]; // İlk grubu al (öğrenci bir kursa birden fazla grupta kayıtlı olmaz)
    
    return {
      id: course.id,
      name: course.name,
      icon: course.icon,
      progress: group?.progress || 0,
      nextLesson: group?.nextLesson || 'Planlanmamış',
      totalLessons: course.lessons.length,
      completedLessons: course.lessons.filter(lesson => lesson.isCompleted).length
    };
  }).filter(Boolean) || [];

  // Mevcut kurslar (öğrencinin kayıtlı olmadığı)
  const availableCourses = mockCourses
    .filter(course => !user?.enrolledCourses?.includes(course.id))
    .slice(0, 3)
    .map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      icon: course.icon,
      duration: `${course.duration} hafta`,
      level: course.level === 'beginner' ? 'Başlangıç' : 
             course.level === 'intermediate' ? 'Orta' : 'İleri'
    }));

  // Öğrencinin ödevlerini al
  const recentAssignments = mockAssignments
    .filter(assignment => {
      // Öğrencinin kayıtlı olduğu gruplardaki ödevler
      const studentGroups = mockGroups.filter(group => 
        group.students.includes(user?.id || '')
      );
      return studentGroups.some(group => group.id === assignment.groupId);
    })
    .map(assignment => {
      const course = getCourseById(assignment.courseId);
      const submission = assignment.submissions.find(sub => sub.studentId === user?.id);
      
      return {
        id: assignment.id,
        title: assignment.title,
        course: course?.name || 'Bilinmeyen Kurs',
        dueDate: assignment.dueDate,
        status: submission ? 'completed' : 'pending'
      };
    })
    .slice(0, 3);

  // Sınıf sıralaması (demo veri)
  const classRanking = {
    position: 3,
    totalStudents: 25,
    points: user?.points || 0
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Bekliyor';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Alanı */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hoş geldin, {user?.fullName}! 🎉
            </h1>
            <p className="text-lg opacity-90">
              Bugün hangi kodlama macerasına başlıyorsun?
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{classRanking.points} Puan</div>
            <div className="text-sm opacity-75">
              Sınıf Sıralaması: {classRanking.position}/{classRanking.totalStudents}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Aktif Kurslar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Aktif Kurslarım
            </CardTitle>
            <CardDescription>
              Devam ettiğin kurslar ve ilerleme durumun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img 
                    src={course.icon} 
                    alt={course.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{course.name}</h3>
                      <Badge variant="secondary">
                        {course.completedLessons}/{course.totalLessons} Ders
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Sonraki Ders: {course.nextLesson}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>İlerleme</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button size="sm" className="mt-3">
                      <Play className="mr-2 h-4 w-4" />
                      Devam Et
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hızlı İstatistikler */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-accent" />
                Başarımlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {getAchievementsByUser(user?.id || '').length}
              </div>
              <p className="text-sm text-muted-foreground">Toplam Rozet</p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Tümünü Gör
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Sınıf Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">#{classRanking.position}</div>
              <p className="text-sm text-muted-foreground">
                {classRanking.totalStudents} kişi arasında
              </p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Liderlik Tablosu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bekleyen Ödevler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Bekleyen Ödevler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  <p className="text-xs text-muted-foreground">
                    Son Tarih: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <Badge className={getStatusColor(assignment.status)}>
                  {getStatusText(assignment.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mevcut Kurslar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              Yeni Kurslar
            </CardTitle>
            <CardDescription>
              Kayıt olabileceğin diğer kurslar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <img 
                  src={course.icon} 
                  alt={course.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{course.name}</h4>
                  <p className="text-xs text-muted-foreground">{course.duration} • {course.level}</p>
                </div>
                <Button size="sm" variant="outline">
                  İncele
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;