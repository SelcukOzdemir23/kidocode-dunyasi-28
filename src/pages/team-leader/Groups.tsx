import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Eye, Edit } from 'lucide-react';

const TeamLeaderGroups = () => {
  const groups = [
    { id: 1, name: 'Python Başlangıç Grubu A', students: 8, teacher: 'Fatma Kaya', level: 'Başlangıç' },
    { id: 2, name: 'Scratch Orta Seviye', students: 6, teacher: 'Ali Veli', level: 'Orta' },
    { id: 3, name: 'Web Tasarım İleri', students: 4, teacher: 'Ayşe Demir', level: 'İleri' },
    { id: 4, name: 'Kodu Programlama', students: 10, teacher: 'Mehmet Yılmaz', level: 'Başlangıç' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğrenci Grupları</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Grup Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {group.name}
                <Badge>{group.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Öğretmen: {group.teacher}</p>
                <p className="text-sm text-muted-foreground">Öğrenci Sayısı: {group.students}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Detaylar
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
  );
};

export default TeamLeaderGroups;