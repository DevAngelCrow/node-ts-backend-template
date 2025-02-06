import { CustomError, HttpClientRepository } from "../../../domain";
import { envs } from "../../config/envs";
import { HttpClient } from "../../config/httpCient";

export class ImplHttpClientRepository implements HttpClientRepository{
    private provider : "axios" | "fetch";
    private httpClient : HttpClient;

    constructor(library: string){
        this.provider = this.libraryValidation(library);
        this.httpClient = new HttpClient(this.provider)
    }
    get<T>(url: string, params?: unknown): Promise<T> {
        try {
            return this.httpClient.get(url, this.httpClient.config?.headers);
        } catch (error) {
            throw CustomError.wrapperError("Error in external API" , 403)
        }
    }
    post<T>(url: string, data?: unknown): Promise<T> {
        try {
            return this.httpClient.post(url, data, this.httpClient.config?.headers)    
        } catch (error) {
            throw CustomError.wrapperError("Error in external API" , 403)
        }
    }
    put<T>(url: string, data?: unknown): Promise<T> {
        try {
            return this.httpClient.put(url, data, this.httpClient.config?.headers)
        } catch (error) {
            throw CustomError.wrapperError("Error in external API" , 403)
        }
    }
    delete<T>(url: string): Promise<T> {
        try {
            return this.httpClient.delete(url, this.httpClient.config?.headers);
        } catch (error) {
            throw CustomError.wrapperError("Error in external API" , 403)
        }
    }

    libraryValidation(library: string) : "axios" | "fetch" {
        switch(library){
            case 'axios':
                return 'axios';
            case 'fetch':
                return 'fetch';
            default :
                return 'fetch'
        }
         
    }
}