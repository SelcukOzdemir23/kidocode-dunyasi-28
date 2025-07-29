import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Edit, Trash2, Play, FileText, Target } from 'lucide-react';

const TeamLeaderCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 'PYT_BEG_2024',
      title: 'Python Başlangıç 2024',
      description: 'Çocuklar için Python programlama temellerini öğrenin',
      level: 'Başlangıç',
      modules: [
        {
          id: 'MOD_001',
          title: 'Python Temelleri',
          description: 'Python programlama dilinin temel kavramları',
          lessons: [
            {
              id: 'LESSON_001',
              title: 'Python Nedir?',
              description: 'Python programlama diline giriş',
              activities: [
                { id: 'ACT_001', title: 'Python Tanıtım Videosu', type: 'video', duration: '10 dakika' },
                { id: 'ACT_002', title: 'İlk Python Kodum', type: 'exercise', duration: '15 dakika' }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeView, setActiveView] = useState('courses');

  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', level: 'Başlangıç' });

  const handleAddCourse = () => {
    const newCourse = {
      id: `COURSE_${Date.now()}`,
      title: courseForm.title,
      description: courseForm.description,
      level: courseForm.level,
      modules: []
    };
    setCourses([...courses, newCourse]);
    setCourseForm({ title: '', description: '', level: 'Başlangıç' });
    setIsCourseDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurs Yönetimi</h1>
        </div>
        {activeView === 'courses' && (
          <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Yeni Kurs
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Kurs Ekle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Kurs Başlığı</Label>
                  <Input
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="Python Başlangıç 2024"
                  />
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <Textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Kurs açıklaması"
                  />
                </div>
                <div>
                  <Label>Seviye</Label>
                  <Select value={courseForm.level} onValueChange={(value) => setCourseForm({ ...courseForm, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                      <SelectItem value="Orta">Orta</SelectItem>
                      <SelectItem value="İleri">İleri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddCourse} className="w-full">
                  Kurs Ekle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>{course.title}</div>
                <Badge>{course.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{course.modules.length} Modül</span>
              </div>
              <Button className="w-full">
                Modülleri Yönet
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderCourses;