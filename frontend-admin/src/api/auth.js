import apiClient from './axios';

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', {
    ...userData,
    role: 'admin',
  });
  return response.data;
};

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await apiClient.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('admin_access_token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  // ត្រូវការបន្ថែម endpoint /users/me ក្នុង backend
  const response = await apiClient.get('/users/me');
  return response.data;
};
