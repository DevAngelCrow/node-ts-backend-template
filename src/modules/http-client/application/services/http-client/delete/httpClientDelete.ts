import { HttpClientRepository } from "../../../../domain/repositories/http-client/HttpClientRepository";

export class HttpClientDelete {
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string) : Promise<T> {
        return this.repository.delete(url);
    }
}