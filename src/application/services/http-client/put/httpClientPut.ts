import { HttpClientRepository } from "../../../../domain";

export class HttpClientPut {
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string, data?: unknown) : Promise<T>{
       return this.repository.put(url, data);
    }
}