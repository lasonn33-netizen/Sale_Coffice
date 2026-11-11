import apiClient from './axios';
import { demoCategories, demoProducts } from './demoProducts';

const isNetworkError = (error) => !error.response;

export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    const search = String(params.search || '').toLowerCase();
    return demoProducts.filter((product) => (
      (!params.category_id || String(product.category_id) === String(params.category_id))
      && (!search || `${product.name} ${product.description}`.toLowerCase().includes(search))
    )).slice(0, params.limit || demoProducts.length);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    return demoProducts.find((product) => String(product.id) === String(id)) || null;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    return demoCategories;
  }
};