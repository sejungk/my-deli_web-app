import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createOrder = async (orderData, cartItems) => {
  try {
    const response = await api.post('/orders', { orderData, cartItems });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
