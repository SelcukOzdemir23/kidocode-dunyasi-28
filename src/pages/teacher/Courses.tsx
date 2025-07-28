import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Clock, Edit, Eye, Plus } from 'lucide-react';

const TeacherCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Python Programlama',
      description: 'Sıfırdan Python öğrenme kursu',
      students: 18,
      totalLessons: 20,
      completedLessons: 12,
      nextLesson: 'Fonksiyonlar ve Parametreler',
      duration: '8 hafta',
      difficulty: 'Başlangıç',
      status: 'active'
    },
    {
      id: 2,
      title: 'Web Tasarım Temelleri',
      description: 'HTML, CSS ve temel JavaScript',
      students: 12,
      totalLessons: 25,
      completedLessons: 8,
      nextLesson: 'CSS Grid Sistemi',
      duration: '10 hafta',
      difficulty: 'Başlangıç',
      status: 'active'
    },
    {
      id: 3,
      title: 'Scratch ile Oyun Geliştirme',
      description: 'Görsel programlama ile oyun yapımı',
      students: 15,
      totalLessons: 15,
      completedLessons: 15,
      nextLesson: 'Kurs Tamamlandı',
      duration: '6 hafta',
      difficulty: 'Orta',
      status: 'completed'
    },
  ];

  const upcomingLessons = [
    { course: 'Python Programlama', lesson: 'Fonksiyonlar', date: 'Yarın 14:00', students: 18 },
    { course: 'Web Tasarım', lesson: 'CSS Grid', date: 'Salı 16:00', students: 12 },
    { course: 'Python Programlama', lesson: 'Liste Kavramları', date: 'Çarşamba 14:00', students: 18 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurslarım</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Ders Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {course.title}
                    <Badge variant={
                      course.status === 'active' ? 'default' : 
                      course.status === 'completed' ? 'secondary' : 'outline'
                    }>
                      {course.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{course.students}</p>
                      <p className="text-xs text-muted-foreground">Öğrenci</p>
                    </div>
                    <div>
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{course.duration}</p>
                      <p className="text-xs text-muted-foreground">Süre</p>
                    </div>
                    <div>
                      <BookOpen className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{course.difficulty}</p>
                      <p className="text-xs text-muted-foreground">Seviye</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Ders İlerlemesi</span>
                      <span>{course.completedLessons}/{course.totalLessons}</span>
                    </div>
                    <Progress 
                      value={(course.completedLessons / course.totalLessons) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Sonraki Ders:</p>
                    <p className="font-medium">{course.nextLesson}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Görüntüle
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yaklaşan Dersler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{lesson.lesson}</h3>
                      <Badge variant="outline">{lesson.students} öğrenci</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lesson.course}</p>
                    <p className="text-sm font-medium text-primary">{lesson.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hızlı İstatistikler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Toplam Öğrenci</span>
                  <span className="font-bold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Aktif Kurslar</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamamlanan Kurslar</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bu Hafta Ders</span>
                  <span className="font-bold">6</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourses;