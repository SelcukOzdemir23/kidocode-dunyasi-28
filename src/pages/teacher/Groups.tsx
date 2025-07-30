import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, Calendar, Clock, Eye } from 'lucide-react';
import { mockGroups, mockCourses, getCourseById, getGroupsByTeacher } from '@/data/mockData';

const TeacherGroups = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Öğretmenin gruplarını al
  const groups = getGroupsByTeacher(user?.id || '').map(group => {
    const course = getCourseById(group.courseId);
    return {
      id: group.id,
      name: group.name,
      courseName: course?.name || 'Bilinmeyen Kurs',
      studentCount: group.currentStudents,
      startDate: group.startDate,
      endDate: group.endDate,
      duration: `${Math.ceil((new Date(group.endDate).getTime() - new Date(group.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} hafta`,
      ageGroup: course?.ageGroup || 'Bilinmeyen',
      status: group.status,
      progress: group.progress,
      nextLesson: group.nextLesson || 'Planlanmamış'
    };
  });

  const handleGroupClick = (groupId: number) => {
    navigate(`/teacher/groups/${groupId}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Gruplarım</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{group.name}</span>
                <Badge variant={
                  group.status === 'active' ? 'default' : 
                  group.status === 'completed' ? 'secondary' : 'outline'
                }>
                  {group.status === 'active' ? 'Aktif' : 
                   group.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{group.courseName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">{group.studentCount}</p>
                  <p className="text-xs text-muted-foreground">Öğrenci</p>
                </div>
                <div>
                  <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">{group.duration}</p>
                  <p className="text-xs text-muted-foreground">Süre</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium">{group.ageGroup}</p>
                <p className="text-xs text-muted-foreground">Yaş Grubu</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>İlerleme</span>
                  <span>%{group.progress}</span>
                </div>
                <Progress value={group.progress} className="h-2" />
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">Sonraki Ders:</p>
                <p className="font-medium">{group.nextLesson}</p>
              </div>

              <Button 
                onClick={() => handleGroupClick(group.id)}
                className="w-full" 
                variant="outline"
              >
                <Eye className="h-4 w-4 mr-2" />
                Grubu Görüntüle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherGroups;