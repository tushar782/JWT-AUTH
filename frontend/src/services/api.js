import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7001/api',  // Make sure this matches your backend URL
    withCredentials: true
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const getDashboardData = async (role) => {
    const response = await api.get(`/users/${role}`);
    return response.data;
};

export default api;