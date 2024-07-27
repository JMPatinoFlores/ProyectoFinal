import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api', // replace with your backend URL
});

export const searchHotels = async (query: string) => {
  const response = await api.get(`hotels?name=${query}`);
  return response.data;
};
