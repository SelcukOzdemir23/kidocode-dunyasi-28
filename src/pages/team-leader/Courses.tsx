import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, Plus, Edit, Trash2, ChevronDown, ChevronRight, FileText, Play, CheckSquare } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  type: 'video' | 'exercise' | 'quiz';
  duration: number;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface Lesson {
  id: number;
  name: string;
  description: string;
  activities: Activity[];
  homework: Homework[];
}

interface Module {
  id: number;
  name: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  name: string;
  courseId: string;
  description: string;
  modules: Module[];
  totalStudents: number;
  status: 'active' | 'draft';
}

const TeamLeaderCourses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      courseId: 'PYT_BEG_2024_8-10',
      name: 'Python Başlangıç 2024 8-10 Yaş',
      description: 'Çocuklar için Python programlama temellerini öğreten kapsamlı kurs',
      modules: [
        {
          id: 1,
          name: 'Python Temelleri',
          description: 'Python programlamanın temel kavramları',
          lessons: [
            {
              id: 1,
              name: 'Python Nedir?',
              description: 'Python programlama diline giriş',
              activities: [
                { id: 1, name: 'Giriş Videosu', type: 'video', duration: 15 },
                { id: 2, name: 'İlk Kod Yazma', type: 'exercise', duration: 30 }
              ],
              homework: [
                { id: 1, title: 'Python Kurulumu', description: 'Bilgisayarınıza Python kurun', dueDate: '2024-02-01' }
              ]
            }
          ]
        }
      ],
      totalStudents: 25,
      status: 'active'
    }
  ]);

  const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
  
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    courseId: '',
    name: '',
    description: ''
  });

  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      courseId: courseFormData.courseId,
      name: courseFormData.name,
      description: courseFormData.description,
      modules: [],
      totalStudents: 0,
      status: 'draft'
    };
    setCourses([...courses, newCourse]);
    setCourseFormData({ courseId: '', name: '', description: '' });
    setIsAddCourseOpen(false);
  };

  const addModule = (courseId: string) => {
    const moduleName = prompt('Modül adı:');
    if (moduleName) {
      setCourses(courses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              modules: [...course.modules, {
                id: Date.now(),
                name: moduleName,
                description: '',
                lessons: []
              }]
            }
          : course
      ));
    }
  };

  const addLesson = (courseId: string, moduleId: number) => {
    const lessonName = prompt('Ders adı:');
    if (lessonName) {
      setCourses(courses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === moduleId
                  ? {
                      ...module,
                      lessons: [...module.lessons, {
                        id: Date.now(),
                        name: lessonName,
                        description: '',
                        activities: [],
                        homework: []
                      }]
                    }
                  : module
              )
            }
          : course
      ));
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-3 w-3" />;
      case 'exercise': return <FileText className="h-3 w-3" />;
      case 'quiz': return <CheckSquare className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurs Yönetimi</h1>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Kurs Oluştur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Kurs Oluştur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="courseId">Kurs ID</Label>
                <Input
                  id="courseId"
                  value={courseFormData.courseId}
                  onChange={(e) => setCourseFormData({ ...courseFormData, courseId: e.target.value })}
                  placeholder="PYT_BEG_2024_8-10"
                />
              </div>
              <div>
                <Label htmlFor="courseName">Kurs Adı</Label>
                <Input
                  id="courseName"
                  value={courseFormData.name}
                  onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
                  placeholder="Python Başlangıç 2024"
                />
              </div>
              <div>
                <Label htmlFor="courseDescription">Açıklama</Label>
                <Textarea
                  id="courseDescription"
                  value={courseFormData.description}
                  onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  placeholder="Kurs açıklaması..."
                />
              </div>
              <Button onClick={handleAddCourse} className="w-full">
                Kursu Oluştur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCourseExpansion(course.id)}
                  >
                    {expandedCourses.includes(course.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {course.courseId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status === 'active' ? 'Aktif' : 'Taslak'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{course.totalStudents} öğrenci</span>
                </div>
              </div>
            </CardHeader>
            <Collapsible open={expandedCourses.includes(course.id)}>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Modüller ({course.modules.length})</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addModule(course.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Modül Ekle
                      </Button>
                    </div>
                    
                    {course.modules.map((module) => (
                      <Card key={module.id} className="ml-4">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleModuleExpansion(`${course.id}-${module.id}`)}
                              >
                                {expandedModules.includes(`${course.id}-${module.id}`) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </Button>
                              <h5 className="font-medium">{module.name}</h5>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLesson(course.id, module.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Ders Ekle
                            </Button>
                          </div>
                        </CardHeader>
                        <Collapsible open={expandedModules.includes(`${course.id}-${module.id}`)}>
                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              {module.lessons.map((lesson) => (
                                <Card key={lesson.id} className="ml-4 mb-2">
                                  <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleLessonExpansion(`${course.id}-${module.id}-${lesson.id}`)}
                                      >
                                        {expandedLessons.includes(`${course.id}-${module.id}-${lesson.id}`) ? (
                                          <ChevronDown className="h-3 w-3" />
                                        ) : (
                                          <ChevronRight className="h-3 w-3" />
                                        )}
                                      </Button>
                                      <h6 className="font-medium text-sm">{lesson.name}</h6>
                                    </div>
                                  </CardHeader>
                                  <Collapsible open={expandedLessons.includes(`${course.id}-${module.id}-${lesson.id}`)}>
                                    <CollapsibleContent>
                                      <CardContent className="pt-0">
                                        <div className="space-y-3">
                                          <div>
                                            <h6 className="text-xs font-semibold text-muted-foreground mb-2">AKTİVİTELER</h6>
                                            {lesson.activities.map((activity) => (
                                              <div key={activity.id} className="flex items-center gap-2 text-sm mb-1">
                                                {getActivityIcon(activity.type)}
                                                <span>{activity.name}</span>
                                                <Badge variant="outline" className="text-xs">
                                                  {activity.duration} dk
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                                          <div>
                                            <h6 className="text-xs font-semibold text-muted-foreground mb-2">ÖDEVLER</h6>
                                            {lesson.homework.map((hw) => (
                                              <div key={hw.id} className="text-sm mb-1">
                                                <span className="font-medium">{hw.title}</span>
                                                <span className="text-muted-foreground ml-2">
                                                  Teslim: {new Date(hw.dueDate).toLocaleDateString('tr-TR')}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>
                              ))}
                            </CardContent>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderCourses;