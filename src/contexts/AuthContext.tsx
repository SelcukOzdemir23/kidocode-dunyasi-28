import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, mockUsers, demoCredentials } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const savedUser = localStorage.getItem('kidocode_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo kullanıcılarından kontrol et
    const foundUser = mockUsers.find(u => u.username === username);
    
    // Şifre kontrolü
    const isValidPassword = 
      (username === demoCredentials.admin.username && password === demoCredentials.admin.password) ||
      (username === demoCredentials.teamLeader.username && password === demoCredentials.teamLeader.password) ||
      (username === demoCredentials.teacher.username && password === demoCredentials.teacher.password) ||
      (username === demoCredentials.student.username && password === demoCredentials.student.password);
    
    if (foundUser && isValidPassword) {
      setUser(foundUser);
      localStorage.setItem('kidocode_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kidocode_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};