import axios from 'axios';

const baseURL = 'https://api.airship.co.uk';

export const airshipQuery = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
