import axios from 'axios';
import Honeybadger from '@honeybadger-io/js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const applyForProduct = async (data) => {
  try {
    return await axios.post(`${API_URL}/apply`, data);
  } catch (err) {
    Honeybadger.notify(err);
    throw err;
  }
};

export const getAllApplications = async () => {
  try {
    return await axios.get(`${API_URL}/applications`);
  } catch (err) {
    Honeybadger.notify(err);
    throw err;
  }
};

export const acceptOffer = async (id) => {
  try {
    return await axios.post(`${API_URL}/offer/${id}/accept`);
  } catch (err) {
    Honeybadger.notify(err);
    throw err;
  }
};

export const getApplicationById = async (id) => {
  try {
    return await axios.get(`${API_URL}/applications/${id}`);
  } catch (err) {
    Honeybadger.notify(err);
    throw err;
  }
};