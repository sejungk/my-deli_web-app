import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SERVER_URL,
});

export const createCheckoutSession = async (items) => {
  try {
    const response = await api.post('/create-checkout-session', { items });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData, cartItems) => {
  try {
    const response = await api.post('api/orders', { orderData, cartItems });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default api;
