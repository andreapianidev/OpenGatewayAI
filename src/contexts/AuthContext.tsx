import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'merchant';
  merchantId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
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

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('opengateway_user');
    const rememberFlag = localStorage.getItem('opengateway_remember');
    
    // Only restore user if they chose "Remember me"
    if (savedUser && rememberFlag === 'true') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('opengateway_user');
        localStorage.removeItem('opengateway_remember');
      }
    } else {
      // Clear any stale data if remember flag is not set
      localStorage.removeItem('opengateway_user');
      localStorage.removeItem('opengateway_remember');
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    // Mock authentication - in real app this would call an API
    let userData: User | null = null;
    
    if (email === 'admin@opengateway.ai' && password === 'admin123') {
      userData = {
        id: '1',
        name: 'Hajer Amara',
        email: 'admin@opengateway.ai',
        role: 'admin'
      };
    } else if (email === 'merchant@example.com' && password === 'merchant123') {
      userData = {
        id: '2',
        name: 'Damascus Store',
        email: 'merchant@example.com',
        role: 'merchant',
        merchantId: 'MERCH001'
      };
    }
    
    if (userData) {
      setUser(userData);
      
      // Handle localStorage based on rememberMe preference
      if (rememberMe) {
        localStorage.setItem('opengateway_user', JSON.stringify(userData));
        localStorage.setItem('opengateway_remember', 'true');
      } else {
        localStorage.removeItem('opengateway_user');
        localStorage.removeItem('opengateway_remember');
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('opengateway_user');
    localStorage.removeItem('opengateway_remember');
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