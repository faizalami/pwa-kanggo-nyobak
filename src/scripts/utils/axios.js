import axios from 'axios';

if (!process.env.API_BASE_URL) {
  console.error('Please setup API_BASE_URL environment variable');
}

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default {
  async get (url, config) {
    const { data } = await instance.get(url, config);
    return data;
  },
  async post (url, payload, config) {
    const { data } = await instance.post(url, payload, config);
    return data;
  },
};
