import axios, { AxiosRequestConfig } from 'axios';
import { HttpResponse, HttpFileResponse } from './httpResponse';

export let API_URL = 'http://localhost:5000';

const standardClient = axios.create({
  baseURL: API_URL,
});

standardClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error && !axios.isCancel(error)) {
      //TODO: redirect
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
