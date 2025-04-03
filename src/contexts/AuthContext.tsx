
import api from '@/api';
import React, { createContext, useContext, useState, useEffect } from 'react';


export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  admin?: boolean;
  attending_events?: [string]
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email:string, password:string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, wallet: string, password: string, attending_events: []) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) throw new Error("No refresh token found");

      const response = await api.post(`${apiUrl}/auth/refresh`, { refresh_token });
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);
      setToken(access_token);
      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      api.get(`/profile`)
      .then(({data}) => {
        console.log(data)
        setUser(data)
      })
      .catch(() => logout())
      .finally(() => setIsLoading(false)); // ensure loading state is reset
    }
  }, [token]);



  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      
      const {data} = await api.post(`/auth/login`, {email, password});
      
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      setToken(data.access_token);
      
      
      
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    // setIsLoading(true);
  };
  // signup function
  const signup = async (name: string, email: string, wallet: string, password: string, attending_events: []) => {
    setIsLoading(true);
    try {
      await api.post(`/user`, {name, email, wallet, password, attending_events});
    } catch (error) {
      
      
      throw new Error(error);
    } finally {
      setIsLoading(false)
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signInWithGoogle, signup, logout, isLoading }}>
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
