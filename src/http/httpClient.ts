import { MessageBus } from '@/components/MessageBus';
import router from '@/router';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Vue from 'vue';
import { HttpResponse, HttpFileResponse } from './httpResponse';

const API_URL: string = 'http://localhost:5000';

const standardClient = axios.create({
  baseURL: API_URL,
});

let loadingTimeout: number | null = null;

standardClient.interceptors.request.use(
  (config) => {
    loadingTimeout = setTimeout(() => {
      MessageBus.$emit('startGlobalLoading');
    }, 500);
    if (config.headers) {
      if (localStorage.userData) {
        const token = JSON.parse(localStorage.userData).token;
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    return config;
  },
  (error) => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
    MessageBus.$emit('stopGlobalLoading');
    Promise.reject(error);
  }
);

standardClient.interceptors.response.use(
  (response) => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
    MessageBus.$emit('stopGlobalLoading');
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
    MessageBus.$emit('stopGlobalLoading');
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !axios.isCancel(error)
    ) {
      router.replace({ name: 'Logout' });
    }

    return Promise.reject(error);
  }
);

export async function get(url: string): Promise<HttpResponse> {
  const { status, data } = await standardClient.get(url);
  return { status, data };
}

export async function post(url: string, payload: any): Promise<HttpResponse> {
  const { status, data } = await standardClient.post(url, payload);
  return { status, data };
}

export async function put(url: string, payload: any): Promise<HttpResponse> {
  const { status, data } = await standardClient.put(url, payload);
  return { status, data };
}

export async function del(url: string): Promise<HttpResponse> {
  const { status, data } = await standardClient.delete(url);
  return { status, data };
}

export async function download(url: string): Promise<HttpFileResponse> {
  const config: AxiosRequestConfig = {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/octet-stream',
    },
  };

  const { status, data, headers } = await standardClient.get(url, config);

  const filename = headers['content-disposition'];
  const mimeType = headers['content-type'];

  return { status, data, filename, mimeType };
}

export default standardClient;
