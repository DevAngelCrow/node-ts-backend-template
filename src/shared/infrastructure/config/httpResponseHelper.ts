import { CustomError } from "../../domain/errors/custom.error";
import { HttpResponse } from "../interfaces/HttpResponseInterface";
import { HttpStatusCode } from "./httpCodes";
import { Response } from "express";
export class HttpResponseHelper {
  public static success<R>(data: R): HttpResponse<R> {
    return {
      status_code: HttpStatusCode.HTTP_OK,
      body: { data },
    };
  }
  public static created<R>(data: R): HttpResponse<R> {
    return {
      status_code: HttpStatusCode.HTTP_CREATED,
      body: { data },
    };
  }
  public static badRequest(response: Response, error: unknown) : Response {
    if(error instanceof CustomError){
        return response.status(error.statusCode).json({message: error.message});
    }
    return response.status(HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
  }
}
