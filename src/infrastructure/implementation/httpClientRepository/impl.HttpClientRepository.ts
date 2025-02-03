import { HttpClientRepository } from "../../../domain";

export class ImplHttpClientRepository implements HttpClientRepository{
    get<T>(url: string, params?: unknown): Promise<T> {
        throw new Error("Method not implemented.");
    }
    post<T>(url: string, data?: unknown): Promise<T> {
        
        throw new Error("Method not implemented.");
    }
    put<T>(url: string, data?: unknown): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    
}