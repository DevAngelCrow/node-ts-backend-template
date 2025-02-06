import { HttpClientRepository } from "../../../../domain";

export class HttpClientDelete {
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string) : Promise<T> {
        return this.repository.delete(url);
    }
}