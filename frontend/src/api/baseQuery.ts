import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const formQuery = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
