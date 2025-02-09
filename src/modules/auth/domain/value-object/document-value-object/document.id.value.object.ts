import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class DocumentId {
  constructor(readonly value: number) {
    this.idIsNumberValid();
  }

  private idIsNumberValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(`The field type is not valid`);
    }
    if (this.value < 0) {
      throw CustomError.badRequest(`The value cannot be less than 0`);
    }
  }
}
