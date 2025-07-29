import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Target, Plus, Eye, Edit, Calendar as CalendarIcon, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Assignment {
  id: number;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  moduleId: string;
  moduleName: string;
  dueDate: Date;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  estimatedTime: string;
  assignedGroups: string[];
  status: 'draft' | 'active' | 'completed';
}

const TeamLeaderAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Python Değişkenler Ödevi',
      description: 'Değişken tanımlama ve kullanımı üzerine pratik ödevler',
      courseId: 'PYT_BEG_2024',
      courseName: 'Python Başlangıç',
      moduleId: 'MOD_001',
      moduleName: 'Temel Kavramlar',
      dueDate: new Date('2024-02-15'),
      difficulty: 'Kolay',
      estimatedTime: '2 saat',
      assignedGroups: ['TUR_PYT_2024_8-10_001', 'TUR_PYT_2024_11-13_001'],
      status: 'active'
    },
    {
      id: 2,
      title: 'Web Sayfası Tasarımı',
      description: 'HTML ve CSS kullanarak kişisel portföy sayfası oluşturma',
      courseId: 'WEB_ADV_2024',
      courseName: 'Web Tasarım İleri',
      moduleId: 'MOD_002',
      moduleName: 'CSS Temelleri',
      dueDate: new Date('2024-02-20'),
      difficulty: 'Orta',
      estimatedTime: '4 saat',
      assignedGroups: ['TUR_WEB_2024_11-13_001'],
      status: 'active'
    }
  ]);

  const [courses] = useState([
    { id: 'PYT_BEG_2024', name: 'Python Başlangıç 2024' },
    { id: 'SCR_INT_2024', name: 'Scratch Programlama 2024' },
    { id: 'WEB_ADV_2024', name: 'Web Tasarım İleri 2024' },
    { id: 'KDU_BEG_2024', name: 'Kodu Programlama 2024' },
  ]);

  const [groups] = useState([
    { id: 'TUR_PYT_2024_8-10_001', name: 'TUR_PYT_2024_8-10_001', course: 'Python Başlangıç' },
    { id: 'TUR_PYT_2024_11-13_001', name: 'TUR_PYT_2024_11-13_001', course: 'Python Başlangıç' },
    { id: 'TUR_WEB_2024_11-13_001', name: 'TUR_WEB_2024_11-13_001', course: 'Web Tasarım İleri' },
    { id: 'SCR_INT_2024_8-10_001', name: 'SCR_INT_2024_8-10_001', course: 'Scratch Programlama' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    moduleId: '',
    dueDate: new Date(),
    difficulty: 'Kolay' as Assignment['difficulty'],
    estimatedTime: '',
    assignedGroups: [] as string[]
  });

  const handleAddAssignment = () => {
    const selectedCourse = courses.find(c => c.id === formData.courseId);
    
    if (selectedCourse) {
      const newAssignment: Assignment = {
        id: assignments.length + 1,
        title: formData.title,
        description: formData.description,
        courseId: formData.courseId,
        courseName: selectedCourse.name,
        moduleId: formData.moduleId,
        moduleName: `Modül ${formData.moduleId}`,
        dueDate: formData.dueDate,
        difficulty: formData.difficulty,
        estimatedTime: formData.estimatedTime,
        assignedGroups: formData.assignedGroups,
        status: 'active'
      };
      
      setAssignments([...assignments, newAssignment]);
      setFormData({
        title: '',
        description: '',
        courseId: '',
        moduleId: '',
        dueDate: new Date(),
        difficulty: 'Kolay',
        estimatedTime: '',
        assignedGroups: []
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteAssignment = (assignmentId: number) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return 'bg-green-100 text-green-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Zor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Ödev Atama</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Ödev Ata
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Ödev Atama</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Ödev Başlığı</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ödev başlığını girin"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ödev açıklamasını girin"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Kurs</Label>
                  <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kurs seçin..." />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="module">Modül ID</Label>
                  <Input
                    id="module"
                    value={formData.moduleId}
                    onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                    placeholder="MOD_001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Zorluk Seviyesi</Label>
                  <Select value={formData.difficulty} onValueChange={(value: Assignment['difficulty']) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kolay">Kolay</SelectItem>
                      <SelectItem value="Orta">Orta</SelectItem>
                      <SelectItem value="Zor">Zor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="estimatedTime">Tahmini Süre</Label>
                  <Input
                    id="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    placeholder="2 saat"
                  />
                </div>
              </div>

              <div>
                <Label>Son Teslim Tarihi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dueDate ? format(formData.dueDate, "PPP", { locale: tr }) : "Tarih seçin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) => date && setFormData({ ...formData, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Grupları Seç ({formData.assignedGroups.length} seçili)</Label>
                <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                  {groups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`group-${group.id}`}
                        checked={formData.assignedGroups.includes(group.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              assignedGroups: [...formData.assignedGroups, group.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              assignedGroups: formData.assignedGroups.filter(id => id !== group.id)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`group-${group.id}`} className="text-sm">
                        {group.name} ({group.course})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleAddAssignment} 
                className="w-full" 
                disabled={!formData.title || !formData.courseId || formData.assignedGroups.length === 0}
              >
                Ödevi Ata
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="space-y-1">
                  <div>{assignment.title}</div>
                  <div className="text-sm font-normal text-muted-foreground">{assignment.courseName}</div>
                </div>
                <Badge variant={getStatusColor(assignment.status)}>
                  {assignment.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{assignment.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Modül:</strong> {assignment.moduleName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Son Tarih:</strong> {format(assignment.dueDate, "dd MMMM yyyy", { locale: tr })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Zorluk:</strong> 
                    <span className={`inline-block ml-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assignment.difficulty)}`}>
                      {assignment.difficulty}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Süre:</strong> {assignment.estimatedTime}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Atanan Gruplar:</strong>
                </p>
                <div className="flex flex-wrap gap-1">
                  {assignment.assignedGroups.map((groupId, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {groupId}
                    </Badge>
                  ))}
                </div>
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
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderAssignments;