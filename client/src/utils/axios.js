import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const authToken = sessionStorage.getItem('authToken');

const axiosInstance = axios.create({
    baseURL: API_URL, 
    headers: {
        authorization: `Bearer ${authToken}`
    }
});

export default axiosInstance;