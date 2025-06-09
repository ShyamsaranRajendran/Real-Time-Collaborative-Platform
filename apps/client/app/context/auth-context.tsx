'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
};

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });
  const router = useRouter();

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      
      if (accessToken) {
        try {
          // Verify token (you might want to use a proper verification function)
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          
          if (response.ok) {
            const user = await response.json();
            setAuthState({
              isAuthenticated: true,
              user,
              accessToken,
            });
          } else {
            await refreshToken();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          logout();
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { accessToken, refreshToken, user } = await response.json();

    // Store tokens
    sessionStorage.setItem('accessToken', accessToken);
    document.cookie = `refreshToken=${refreshToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; ${
      process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : ''
    }`;

    setAuthState({
      isAuthenticated: true,
      user,
      accessToken,
    });
  };

  const logout = () => {
    // Clear tokens
    sessionStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });

    router.push('/auth/login');
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // For cookie
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const { accessToken, user } = await response.json();
      sessionStorage.setItem('accessToken', accessToken);

      setAuthState({
        isAuthenticated: true,
        user,
        accessToken,
      });

      return accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}