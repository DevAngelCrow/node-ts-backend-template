import { HttpResponse } from "../interfaces/HttpResponseInterface";
import { HttpStatusCode } from "./httpCodes";

export class HttpResponseHelper {
    public static successCreated<R>(data: R) : HttpResponse<R>{
        return {
            status_code: HttpStatusCode.HTTP_CREATED,
            body: data
        };
    }
}