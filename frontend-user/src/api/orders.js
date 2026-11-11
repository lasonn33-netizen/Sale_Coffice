import apiClient from './axios';

export const createOrder = async (orderData) => {
  const response = await apiClient.post('/orders/', orderData);
  return response.data;
};

export const getOrders = async (params = {}) => {
  const response = await apiClient.get('/orders/', { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const makePayment = async (orderId, paymentData) => {
  const response = await apiClient.post(`/payments/orders/${orderId}/payments`, paymentData);
  return response.data;
};
