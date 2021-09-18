import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003',
  headers: {
    "authorization": `Bearer ${localStorage.getItem('token')}`,
  }
})

export { api };