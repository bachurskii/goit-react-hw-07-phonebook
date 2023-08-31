import axios from 'axios';

const API_URL = 'https://64ef5900219b3e2873c45b14.mockapi.io/';

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchContactsFromApi = async () => {
  try {
    const response = await api.get('contacts');
    return response.data;
  } catch (error) {
    throw error;
  }
};
