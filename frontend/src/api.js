import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const scanDisease = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/scan', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const sendChatMessage = async (message, history = []) => {
  const response = await api.post('/chat', { message, history });
  return response.data;
};

export const getFertilizerRecommendation = async (data) => {
  const response = await api.post('/recommend-fertilizer', data);
  return response.data;
};

export default api;
