import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, register as apiRegister } from '../api/auth';
import toast from 'react-hot-toast';
import { useLanguage } from './LanguageContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const { t } = useLanguage();

  useEffect(() => {
    let active = true;
    if (!token) {
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    getCurrentUser()
      .then((profile) => {
        if (active) setUser(profile);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem('access_token');
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password);
      localStorage.setItem('access_token', data.access_token);
      setToken(data.access_token);
      const profile = await getCurrentUser();
      setUser(profile);
      toast.success(t('loginSuccess'));
      return data;
    } catch (error) {
      toast.error(error.response?.data?.detail || t('loginFailed'));
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      toast.success(t('registerSuccess'));
      return data;
    } catch (error) {
      toast.error(error.response?.data?.detail || t('registerFailed'));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    toast.success(t('logoutSuccess'));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
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
