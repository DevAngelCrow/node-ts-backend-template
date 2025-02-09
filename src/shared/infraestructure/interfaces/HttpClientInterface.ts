export interface HttpClientInterface {
    method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "PATCH" | "TRACE";
    headers?: Record<string, string>;
    body?: any;
}