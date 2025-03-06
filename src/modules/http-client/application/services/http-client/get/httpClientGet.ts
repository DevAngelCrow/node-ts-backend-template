import { HttpClientRepository } from "../../../../domain/repositories/http-client/HttpClientRepository";

export class HttpClientGet {
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string, params?: Record<string, unknown>) : Promise<T>{
        return this.repository.get(url, params);
    }
}