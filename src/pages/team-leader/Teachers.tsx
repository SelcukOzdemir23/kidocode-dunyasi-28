import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GraduationCap, Plus, Mail, Phone } from 'lucide-react';

const TeamLeaderTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Fatma Kaya',
      email: 'fatma@kidocode.com',
      phone: '+90 555 123 4567',
      courses: ['Python', 'Scratch'],
      students: 15,
      status: 'active',
      specialization: 'Programlama',
      experience: '3 yıl'
    },
    {
      id: 2,
      name: 'Ali Veli',
      email: 'ali@kidocode.com',
      phone: '+90 555 234 5678',
      courses: ['Web Tasarım', 'JavaScript'],
      students: 12,
      status: 'active',
      specialization: 'Web Tasarım',
      experience: '2 yıl'
    },
    {
      id: 3,
      name: 'Ayşe Demir',
      email: 'ayse@kidocode.com',
      phone: '+90 555 345 6789',
      courses: ['Kodu', 'Robotik'],
      students: 8,
      status: 'inactive',
      specialization: 'Robotik',
      experience: '4 yıl'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    status: 'active'
  });

  const handleAddTeacher = () => {
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      courses: [],
      students: 0,
      status: formData.status,
      specialization: formData.specialization,
      experience: formData.experience
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      status: 'active'
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğretmen Yönetimi</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Öğretmen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Öğretmen Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Öğretmen adı ve soyadı"
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
                <Label htmlFor="specialization">Uzmanlık Alanı</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Programlama, Web Tasarım, vb."
                />
              </div>
              <div>
                <Label htmlFor="experience">Deneyim</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="3 yıl"
                />
              </div>
              <Button onClick={handleAddTeacher} className="w-full">
                Öğretmen Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedTeacher(teacher);
                  setIsDetailDialogOpen(true);
                }}
              >
                Detayları Görüntüle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teacher Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Öğretmen Detayları</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Ad Soyad</Label>
                  <p>{selectedTeacher.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Durum</Label>
                  <Badge variant={selectedTeacher.status === 'active' ? 'default' : 'secondary'}>
                    {selectedTeacher.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">E-posta</Label>
                  <p>{selectedTeacher.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Telefon</Label>
                  <p>{selectedTeacher.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Uzmanlık Alanı</Label>
                  <p>{selectedTeacher.specialization}</p>
                </div>
                <div>
                  <Label className="font-semibold">Deneyim</Label>
                  <p>{selectedTeacher.experience}</p>
                </div>
              </div>
              <div>
                <Label className="font-semibold">Verdiği Kurslar</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.courses.map((course, index) => (
                    <Badge key={index} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Öğrenci Sayısı</Label>
                <p>{selectedTeacher.students} öğrenci</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLeaderTeachers;