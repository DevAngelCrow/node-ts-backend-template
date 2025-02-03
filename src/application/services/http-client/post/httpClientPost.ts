import { HttpClientRepository } from "../../../../domain";

export class HttpClientPost{
    constructor(private repository: HttpClientRepository){}

    async run<T>(url: string, data?: unknown) {
        return this.repository.post(url, data);
    }
}