import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Play, Clock, Trophy } from 'lucide-react';

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Python Programlama',
      description: 'Sıfırdan Python öğren ve projeler geliştir',
      progress: 65,
      totalLessons: 20,
      completedLessons: 13,
      nextLesson: 'Fonksiyonlar ve Parametreler',
      difficulty: 'Başlangıç',
      timeRemaining: '3 hafta'
    },
    {
      id: 2,
      title: 'Scratch ile Oyun Geliştirme',
      description: 'Eğlenceli oyunlar yaparak programlamayı öğren',
      progress: 80,
      totalLessons: 15,
      completedLessons: 12,
      nextLesson: 'Karakter Animasyonları',
      difficulty: 'Orta',
      timeRemaining: '1 hafta'
    },
    {
      id: 3,
      title: 'Web Tasarım Temelleri',
      description: 'HTML, CSS ile web siteleri tasarla',
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      nextLesson: 'CSS Grid Sistemi',
      difficulty: 'Başlangıç',
      timeRemaining: '4 hafta'
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Kurslarım</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {course.title}
                <Badge variant={course.difficulty === 'Başlangıç' ? 'secondary' : 'default'}>
                  {course.difficulty}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>İlerleme</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {course.completedLessons} / {course.totalLessons} ders tamamlandı
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Sonraki Ders:</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{course.nextLesson}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.timeRemaining}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {course.completedLessons} ders
                </div>
              </div>

              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Devam Et
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;