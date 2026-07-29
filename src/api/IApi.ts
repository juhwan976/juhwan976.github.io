import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export default abstract class IApi {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  protected extractErrorMessage(e: unknown): string {
    if (e instanceof Error) {
      return e.message;
    }

    return 'Unknown error';
  }

  protected async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${this.baseUrl}${url}`, config);
  }

  protected async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${this.baseUrl}${url}`, data, config);
  }

  protected async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${this.baseUrl}${url}`, data, config);
  }

  protected async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return axios.delete<T>(`${this.baseUrl}${url}`, config);
  }
}
