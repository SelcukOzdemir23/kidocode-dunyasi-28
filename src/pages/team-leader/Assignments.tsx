import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Calendar, Users } from 'lucide-react';

const TeamLeaderAssignments = () => {
  const assignments = [
    { 
      id: 1, 
      course: 'Python Temelleri', 
      group: 'Başlangıç Grubu A', 
      teacher: 'Fatma Kaya',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      status: 'active'
    },
    { 
      id: 2, 
      course: 'Scratch Oyun Geliştirme', 
      group: 'Orta Seviye Grup', 
      teacher: 'Ali Veli',
      startDate: '2024-02-15',
      endDate: '2024-04-01',
      status: 'planned'
    },
    { 
      id: 3, 
      course: 'Web Tasarım', 
      group: 'İleri Seviye', 
      teacher: 'Ayşe Demir',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      status: 'completed'
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurs Atamaları</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Atama
        </Button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  {assignment.course}
                </div>
                <Badge variant={
                  assignment.status === 'active' ? 'default' : 
                  assignment.status === 'completed' ? 'secondary' : 'outline'
                }>
                  {assignment.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Grup</p>
                    <p className="text-sm text-muted-foreground">{assignment.group}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Öğretmen</p>
                    <p className="text-sm text-muted-foreground">{assignment.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Süre</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.startDate} - {assignment.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderAssignments;