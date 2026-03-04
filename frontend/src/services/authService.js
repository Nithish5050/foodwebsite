import api from './api';

export const authService = {
  // Register user
  register: async (name, email, password, passwordConfirm) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      passwordConfirm,
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
