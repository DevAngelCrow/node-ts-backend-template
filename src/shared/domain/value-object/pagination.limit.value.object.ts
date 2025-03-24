import { CustomError } from "../errors/custom.error";

export class PaginationLimit {
  constructor(readonly value: number) {
    this.idIsNumberValid();
  }

  private idIsNumberValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(`The params type is not valid`);
    }
    if (this.value < 0) {
      throw CustomError.badRequest(`The value of pagination limit cannot be less than 0`);
    }
  }
}
