import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(req => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
});


export default axiosInstance;