import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'merchant';
  merchantId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would call an API
    if (email === 'admin@opengateway.ai' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Hajer Amara',
        email: 'admin@opengateway.ai',
        role: 'admin'
      });
      return true;
    } else if (email === 'merchant@example.com' && password === 'merchant123') {
      setUser({
        id: '2',
        name: 'Damascus Store',
        email: 'merchant@example.com',
        role: 'merchant',
        merchantId: 'MERCH001'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};