import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class BaseAgent {
  protected _http: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this._http = axios.create({
      baseURL,
      ...config,
    });
  }
}
