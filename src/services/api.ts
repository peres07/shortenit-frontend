import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});
