//Base Axios Instance
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API || 'http://localhost:5000/api/';

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' : 'application/json'},
    withCredentials: true,
});

