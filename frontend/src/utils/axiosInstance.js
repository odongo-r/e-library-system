/* frontend/src/utils/axiosInstance.js */
import axios from 'axios';

const token = localStorage.getItem('token'); // Get the token from localStorage
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default axiosInstance;



