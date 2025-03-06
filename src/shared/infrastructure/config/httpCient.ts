import { CustomError } from "../../domain/errors/custom.error";
import { HttpClientInterface } from "../interfaces/HttpClientInterface";
import axios, { AxiosInstance } from "axios";

export class HttpClient {
  
  constructor(
    private clientType: "axios" | "fetch",
    private baseURL: string = "",
    public config?: HttpClientInterface,
    private axiosInstance?: AxiosInstance,
  ) {
    if(this.clientType === "axios"){
        this.axiosInstance = axios.create({baseURL: this.baseURL})
    }
  }

  private async fetchRequest<T>(url: string, config: HttpClientInterface): Promise<T>{
    const response = await fetch(`${this.baseURL}${url}`,{
        method: config.method,
        headers: { "Content-Type": "application/json", ...(config.headers || {})},
        body: config.body ? JSON.stringify(config.body) : undefined,
    });
    if(!response.ok){
        throw CustomError.wrapperError(response.statusText, +response.status)
    }
    return response.json() as Promise<T>;
  }

  async request<T>(url: string, config: HttpClientInterface) : Promise<T> {
    if(this.clientType === "axios" && this.axiosInstance){
        const response = await this.axiosInstance.request<T>({
            url,
            method: config.method,
            headers: config.headers,
            data: config.body
        });
        return response.data;
    }else {
        return this.fetchRequest<T>(url, config);
    }
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(url, { method: "GET", headers });
  }

  async post<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(url, { method: "POST", headers, body });
  }

  async put<T>(url: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(url, { method: "PUT", headers, body });
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(url, { method: "DELETE", headers });
  }
}
