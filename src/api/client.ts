import axios from 'axios';
import { API_BASE_URL } from '@/constants/env';

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetch = async (method: string, url: string, params: any, headers = {}) => {
  const options = {
    method,
    url,
    headers: { 'Content-type': 'application/json', ...headers },
    data: {},
    params: {},
  };

  if (method.toLowerCase() === 'get') options.params = params;
  else options.data = params;

  let response = null;
  try {
    response = await client(options);
  } catch (error) {
    console.log(error);
  }

  return response;
};

export interface ApiResponse {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default client;
