import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
// import beared token from session storage

const axiosInstance = axios.create({
    baseURL: API_URL
    // add header with authorization/bearer token
});

export default axiosInstance;