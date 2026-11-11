import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getCurrentUser,
  login as apiLogin,
  register as apiRegister,
} from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem('admin_access_token')
  );

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      if (!token) {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (currentUser.role !== 'admin') {
          throw new Error('ADMIN_REQUIRED');
        }
        if (active) setUser(currentUser);
      } catch {
        localStorage.removeItem('admin_access_token');
        if (active) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener('admin:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('admin:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem('admin_access_token', data.access_token);

      const currentUser = await getCurrentUser();
      if (currentUser.role !== 'admin') {
        localStorage.removeItem('admin_access_token');
        toast.error('គណនីនេះមិនមែនជា Admin ទេ');
        throw new Error('ADMIN_REQUIRED');
      }

      setUser(currentUser);
      setToken(data.access_token);
      toast.success('ចូលប្រព័ន្ធដោយជោគជ័យ!');
      return data;
    } catch (error) {
      if (error.message !== 'ADMIN_REQUIRED') {
        toast.error(error.response?.data?.detail || 'ចូលប្រព័ន្ធបរាជ័យ');
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      toast.success('បង្កើតគណនី Admin បានជោគជ័យ! សូមចូលប្រព័ន្ធ');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'បង្កើតគណនី Admin បរាជ័យ');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_access_token');
    setToken(null);
    setUser(null);
    toast.success('ចាកចេញពីប្រព័ន្ធ');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(token && user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
