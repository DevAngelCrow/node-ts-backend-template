import { HttpClientRepository } from "../../../../domain";

export class HttpClientGet {
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string, params?: Record<string, unknown>) : Promise<T>{
        return this.repository.get(url, params);
    }
}