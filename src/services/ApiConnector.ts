import { Toast } from '@/components';
import axios, { AxiosRequestConfig, Method, ResponseType } from 'axios';

export const axiosInstance = axios.create({});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Toast.error('Unauthorized. Please login again.');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (status === 403) {
      Toast.error('You do not have permission to perform this action.');
    } else if (status >= 500) {
      Toast.error('Server error occurred. Please try again later.');
    } else if (error.message === 'Network Error') {
      Toast.error('Network error. Please check your internet connection.');
    }

    return Promise.reject(error);
  }
);
interface ApiConnectorParams {
  method: Method;
  url: string;
  bodyData?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  responseType?: ResponseType;
}

export const apiConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
  responseType,
}: ApiConnectorParams) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || undefined,
    headers: headers || undefined,
    withCredentials: true,
    params: params || undefined,
    responseType: responseType || undefined,
  };

  const timeoutMs = 10000;

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
  });

  return Promise.race([axiosInstance(config), timeoutPromise]);
};

export const apiConnectorWithToken = async ({
  method,
  url,
  bodyData,
  headers,
  params,
  responseType,
}: ApiConnectorParams) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || undefined,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      ...headers,
    },
    withCredentials: true,
    params: params || undefined,
    responseType: responseType || undefined,
  };

  const timeoutMs = 10000;

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
  });

  return Promise.race([axiosInstance(config), timeoutPromise]);
};
