import { TransportAuthOptions } from "./TransportAuthOptionInterface";

export interface TransportOptionsRepo {
    service: string;
    auth: TransportAuthOptions
}