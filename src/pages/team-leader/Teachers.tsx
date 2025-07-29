import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Plus, Mail, Phone } from 'lucide-react';

const TeamLeaderTeachers = () => {
  const teachers = [
    {
      id: 1,
      name: 'Fatma Kaya',
      email: 'fatma@kidocode.com',
      phone: '+90 555 123 4567',
      courses: ['Python', 'Scratch'],
      students: 15,
      status: 'active'
    },
    {
      id: 2,
      name: 'Ali Veli',
      email: 'ali@kidocode.com',
      phone: '+90 555 234 5678',
      courses: ['Web Tasarım', 'JavaScript'],
      students: 12,
      status: 'active'
    },
    {
      id: 3,
      name: 'Ayşe Demir',
      email: 'ayse@kidocode.com',
      phone: '+90 555 345 6789',
      courses: ['Kodu', 'Robotik'],
      students: 8,
      status: 'inactive'
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğretmen Yönetimi</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Öğretmen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {teacher.name}
                <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                  {teacher.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{teacher.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{teacher.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Verdiği Kurslar:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Öğrenci Sayısı: {teacher.students}
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Detayları Görüntüle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderTeachers;