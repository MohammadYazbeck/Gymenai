// services/apiService.ts
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../api/config';

interface ApiService {
  get: (endpoint: string) => AxiosPromise<any>;
  post: (endpoint: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<any>;
  put: (endpoint: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<any>;
  delete: (endpoint: string, config?: AxiosRequestConfig) => AxiosPromise<any>;
  // Add other methods as needed
}

const api = axios.create({
  baseURL: config.backendUrl,
});

const apiService: ApiService = {
  get: (endpoint: string) => api.get(endpoint),
  post: (endpoint: string, data?: any, config?: AxiosRequestConfig) => api.post(endpoint, data, config),
  put: (endpoint: string, data?: any, config?: AxiosRequestConfig) => api.put(endpoint, data, config),
  delete: (endpoint: string, config?: AxiosRequestConfig) => api.delete(endpoint, config),
  // Add other methods as needed
};

export default apiService;
