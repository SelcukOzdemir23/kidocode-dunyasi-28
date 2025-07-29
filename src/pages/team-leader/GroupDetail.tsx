import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  Edit, 
  Calendar as CalendarIcon, 
  MessageCircle, 
  Video,
  Plus,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Student {
  id: number;
  name: string;
  age: number;
}

interface Teacher {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  students: number[];
  teacher: string;
  teacherId: number;
  level: string;
  course: string;
  courseId: string;
  startDate: Date;
  studentCount: number;
  whatsappLink?: string;
  zoomLink?: string;
}

const TeamLeaderGroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  
  const [group, setGroup] = useState<Group>({
    id: 1,
    name: 'TUR_PRE_2024_8-10_001',
    students: [1, 2, 3, 4, 5, 6, 7, 8],
    teacher: 'Fatma Kaya',
    teacherId: 1,
    level: 'Başlangıç',
    course: 'Python Başlangıç',
    courseId: 'PYT_BEG_2024',
    startDate: new Date('2024-02-01'),
    studentCount: 8,
    whatsappLink: 'https://chat.whatsapp.com/example',
    zoomLink: 'https://zoom.us/j/example'
  });

  const [students] = useState<Student[]>([
    { id: 1, name: 'Ayşe Yılmaz', age: 8 },
    { id: 2, name: 'Mehmet Kaya', age: 9 },
    { id: 3, name: 'Zeynep Demir', age: 8 },
    { id: 4, name: 'Ali Çelik', age: 10 },
    { id: 5, name: 'Selin Öz', age: 9 },
    { id: 6, name: 'Cem Aydın', age: 8 },
    { id: 7, name: 'Elif Kara', age: 9 },
    { id: 8, name: 'Murat Yıldız', age: 10 },
    { id: 9, name: 'Defne Ak', age: 8 },
    { id: 10, name: 'Berk Güzel', age: 9 },
  ]);

  const [teachers] = useState<Teacher[]>([
    { id: 1, name: 'Fatma Kaya' },
    { id: 2, name: 'Ali Veli' },
    { id: 3, name: 'Ayşe Demir' },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: group.name,
    teacherId: group.teacherId.toString(),
    startDate: group.startDate,
    selectedStudents: group.students,
    whatsappLink: group.whatsappLink || '',
    zoomLink: group.zoomLink || ''
  });

  const handleUpdateGroup = () => {
    const selectedTeacher = teachers.find(t => t.id === parseInt(editFormData.teacherId));
    
    if (selectedTeacher) {
      const updatedGroup = {
        ...group,
        name: editFormData.name,
        teacher: selectedTeacher.name,
        teacherId: selectedTeacher.id,
        startDate: editFormData.startDate,
        students: editFormData.selectedStudents,
        studentCount: editFormData.selectedStudents.length,
        whatsappLink: editFormData.whatsappLink,
        zoomLink: editFormData.zoomLink
      };
      setGroup(updatedGroup);
      setIsEditDialogOpen(false);
    }
  };

  const handleStudentSelection = (studentId: number, checked: boolean) => {
    if (checked) {
      setEditFormData({
        ...editFormData,
        selectedStudents: [...editFormData.selectedStudents, studentId]
      });
    } else {
      setEditFormData({
        ...editFormData,
        selectedStudents: editFormData.selectedStudents.filter(id => id !== studentId)
      });
    }
  };

  const getGroupStudents = (studentIds: number[]) => {
    return students.filter(s => studentIds.includes(s.id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={() => navigate('/team-leader/groups')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Gruplara Dön
        </Button>
      </div>

      {/* Group Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl">{group.name}</div>
              <div className="text-lg font-normal text-muted-foreground">{group.course}</div>
            </div>
            <div className="flex gap-2">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Grup Düzenle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="groupName">Grup Adı</Label>
                      <Input
                        id="groupName"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsappLink">WhatsApp Davet Bağlantısı</Label>
                      <Input
                        id="whatsappLink"
                        value={editFormData.whatsappLink}
                        onChange={(e) => setEditFormData({ ...editFormData, whatsappLink: e.target.value })}
                        placeholder="https://chat.whatsapp.com/..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="zoomLink">Zoom Toplantı Bağlantısı</Label>
                      <Input
                        id="zoomLink"
                        value={editFormData.zoomLink}
                        onChange={(e) => setEditFormData({ ...editFormData, zoomLink: e.target.value })}
                        placeholder="https://zoom.us/j/..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teacher">Öğretmen</Label>
                      <Select 
                        value={editFormData.teacherId} 
                        onValueChange={(value) => setEditFormData({ ...editFormData, teacherId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Öğretmen seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Başlama Tarihi</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editFormData.startDate ? format(editFormData.startDate, "PPP", { locale: tr }) : "Tarih seçin"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={editFormData.startDate}
                            onSelect={(date) => date && setEditFormData({ ...editFormData, startDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Öğrenci Seçin ({editFormData.selectedStudents.length} seçili)</Label>
                      <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                        {students.map((student) => (
                          <div key={student.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`student-${student.id}`}
                              checked={editFormData.selectedStudents.includes(student.id)}
                              onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                            />
                            <Label htmlFor={`student-${student.id}`} className="text-sm">
                              {student.name} ({student.age} yaş)
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleUpdateGroup} className="w-full">
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Öğretmen</p>
              <p className="text-lg">{group.teacher}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Öğrenci Sayısı</p>
              <p className="text-lg">{group.studentCount} öğrenci</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Seviye</p>
              <Badge>{group.level}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Başlama Tarihi</p>
              <p className="text-lg">{format(group.startDate, "dd MMMM yyyy", { locale: tr })}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {group.whatsappLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={group.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Grubu
                </a>
              </Button>
            )}
            {group.zoomLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={group.zoomLink} target="_blank" rel="noopener noreferrer">
                  <Video className="h-4 w-4 mr-2" />
                  Zoom Toplantısı
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="students">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Öğrenci Listesi</TabsTrigger>
          <TabsTrigger value="calendar">Takvim</TabsTrigger>
          <TabsTrigger value="homework">Ödev Kontrolü</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grup Öğrencileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getGroupStudents(group.students).map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.age} yaş</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grup Takvimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={group.startDate}
                  className="rounded-md border"
                />
                <div className="space-y-4">
                  <h3 className="font-semibold">Yaklaşan Dersler</h3>
                  <div className="space-y-3">
                    {[
                      { date: '15 Şubat 2024', time: '14:00', topic: 'Python Değişkenler' },
                      { date: '17 Şubat 2024', time: '14:00', topic: 'Koşullu İfadeler' },
                      { date: '19 Şubat 2024', time: '14:00', topic: 'Döngüler' },
                    ].map((lesson, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">{lesson.topic}</p>
                        <p className="text-sm text-muted-foreground">{lesson.date} - {lesson.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homework" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ödev Kontrolü</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: 'Python Değişkenler Ödevi', 
                    dueDate: '20 Şubat 2024', 
                    submitted: 6, 
                    total: 8,
                    status: 'active'
                  },
                  { 
                    title: 'Koşullu İfadeler Pratik', 
                    dueDate: '25 Şubat 2024', 
                    submitted: 3, 
                    total: 8,
                    status: 'pending'
                  },
                ].map((homework, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{homework.title}</h4>
                      <Badge variant={homework.status === 'active' ? 'default' : 'secondary'}>
                        {homework.status === 'active' ? 'Aktif' : 'Beklemede'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Son Teslim: {homework.dueDate}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(homework.submitted / homework.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {homework.submitted}/{homework.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamLeaderGroupDetail;