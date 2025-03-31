import { CustomError } from "../../domain/errors/custom.error";
import { HttpResponse } from "../interfaces/HttpResponseInterface";
import { HttpStatusCode } from "./httpCodes";
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

  public static createErrorResponse(
    error: CustomError
  ): HttpResponse<{ message: string }> {
    switch (error.statusCode){
      case 400 : 
      return this.badRequest(error);
      case 401 :
        return this.unathorized(error);
      case 403 :
        return this.forbiden(error);
      case 404 :
        return this.notFound(error);
      case 405 : 
      return this.methodNotAllowed(error);
      case 415 :
        return this.unsupportedMediType(error);
      case 422 :
        return this.unprocesableEntity(error);
      case 429 :
        return this.tooManyRequest(error);
      default :
        return this.internalServerError(error);
    }
    // return {
    //   status_code: error.statusCode,
    //   body: {
    //     data: {
    //       message: error.message,
    //     },
    //   },
    // };
  }
  private static badRequest(error: unknown): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_BAD_REQUEST,
        body: { data: { message: error.message } },
      };
    }
    return {
      status_code: HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
      body: { data: { message: "Internal server error" } },
    };
  }

  private static unathorized(error: unknown): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_UNAUTHORIZED,
        body: { data: { message: error.message } },
      };;
    }
    return this.internalServerError(error);
  }

  private static forbiden(error: unknown): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_FORBIDEN,
        body: { data: { message: error.message } },
      };;
    }
    return this.internalServerError(error);
  }
  private static notFound(error: unknown): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_NOT_FOUND,
        body: { data: { message: error.message } },
      };
    }
    return this.internalServerError(error);
  }
  private static methodNotAllowed(
    error: unknown
  ): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_METHOD_NOT_ALLOWED,
        body: { data: { message: error.message } },
      };;
    }
    return this.internalServerError(error);
  }
  private static unsupportedMediType(
    error: unknown
  ): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_UNSOPPORTED_MEDIA_TYPE,
        body: { data: { message: error.message } },
      };
    }
    return this.internalServerError(error);
  }
  private static tooManyRequest(
    error: unknown
  ): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_TO_MANY_REQUESTS,
        body: { data: { message: error.message } },
      };;
    }
    return this.internalServerError(error);
  }
  private static unprocesableEntity(
    error: unknown
  ): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_UNPROCESABLE_ENTITY,
        body: { data: { message: error.message } },
      };
    }
    return this.internalServerError(error);
  }
  private static internalServerError(
    error: unknown
  ): HttpResponse<{ message: string }> {
    if (error instanceof CustomError) {
      return {
        status_code: HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
        body: { data: { message: error.message } },
      };;
    }
    return {
      status_code: HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
      body: { data: { message: "Internal server error" } },
    };
  }
}
