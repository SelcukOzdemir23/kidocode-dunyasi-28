import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserPlus, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  enrollmentDate: string;
  courses: string[];
  status: 'active' | 'inactive';
}

const TeamLeaderStudents = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse@kidocode.com',
      phone: '+90 555 111 2233',
      age: 8,
      enrollmentDate: '2024-01-15',
      courses: ['Python', 'Scratch'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      email: 'mehmet@kidocode.com',
      phone: '+90 555 222 3344',
      age: 10,
      enrollmentDate: '2024-02-01',
      courses: ['Web Tasarım'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      email: 'zeynep@kidocode.com',
      phone: '+90 555 333 4455',
      age: 9,
      enrollmentDate: '2024-01-20',
      courses: ['Kodu', 'Robotik'],
      status: 'inactive'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: students.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age),
      enrollmentDate: new Date().toISOString().split('T')[0],
      courses: [],
      status: formData.status
    };
    setStudents([...students, newStudent]);
    setFormData({ name: '', email: '', phone: '', age: '', status: 'active' });
    setIsAddDialogOpen(false);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      age: student.age.toString(),
      status: student.status
    });
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...formData, age: parseInt(formData.age) }
          : s
      ));
      setEditingStudent(null);
      setFormData({ name: '', email: '', phone: '', age: '', status: 'active' });
    }
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğrenci Yönetimi</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Yeni Öğrenci Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Öğrenci Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Öğrenci adı ve soyadı"
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 555 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="age">Yaş</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="8"
                />
              </div>
              <div>
                <Label htmlFor="status">Durum</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddStudent} className="w-full">
                Öğrenciyi Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Öğrenci Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Yaş</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead>Kurslar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.age} yaş</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(student.enrollmentDate).toLocaleDateString('tr-TR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                      {student.status === 'active' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Öğrenci Düzenle</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Ad Soyad</Label>
                              <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">E-posta</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-phone">Telefon</Label>
                              <Input
                                id="edit-phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-age">Yaş</Label>
                              <Input
                                id="edit-age"
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Durum</Label>
                              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Aktif</SelectItem>
                                  <SelectItem value="inactive">Pasif</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleUpdateStudent} className="w-full">
                              Güncelle
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeaderStudents;