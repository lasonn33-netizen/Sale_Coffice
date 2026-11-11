import apiClient from './axios';

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const login = async (username, password) => {
  // FastAPI OAuth2 តម្រូវឱ្យផ្ញើ form-data (username & password)
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await apiClient.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data; // { access_token, token_type }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  // ប្រសិនបើអ្នកមាន endpoint /auth/me
  const response = await apiClient.get('/users/me'); // ត្រូវបន្ថែម endpoint នេះក្នុង backend
  return response.data;
};