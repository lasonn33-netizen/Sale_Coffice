import apiClient from './axios';

export const getOrders = async (params = {}) => {
  const response = await apiClient.get('/orders/', { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await apiClient.patch(`/orders/${id}/status`, null, {
    params: { status }
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await apiClient.delete(`/orders/${id}`);
  return response.data;
};
