import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { userName, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};