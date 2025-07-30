import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

const AdminUsers = () => {
  const users = mockUsers.map(user => ({
    id: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Yeni Kullanıcı
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;