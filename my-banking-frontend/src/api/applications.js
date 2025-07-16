import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const applyForProduct = (data) => axios.post(`${API_URL}/apply`, data);
export const getAllApplications = () => axios.get(`${API_URL}/applications`);
export const acceptOffer = (id) => axios.post(`${API_URL}/offer/${id}/accept`);
export const getApplicationById = (id) => axios.get(`${API_URL}/applications/${id}`);