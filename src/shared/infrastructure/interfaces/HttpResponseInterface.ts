interface Body <T>{
    data: T,
}

export interface HttpResponse<T> {
    status_code: number;
    body: Body<T>
}