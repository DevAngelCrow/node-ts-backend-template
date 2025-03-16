import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class GenderName {
  
  constructor(readonly value: string) {

    if(typeof value !== "string"){
      throw CustomError.badRequest("The field name must be a string")
    }
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field name is required");
    }
  }
}
