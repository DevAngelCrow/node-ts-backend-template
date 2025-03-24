import { CustomError } from "../errors/custom.error";


export class Pagination {
  constructor(readonly value: number) {
    console.log()
    this.idIsNumberValid();
  }

  private idIsNumberValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(`The field type is not valid`);
    }
    if (this.value <= 0) {
      console.log(this.value, 'aca')
      throw CustomError.badRequest(`The value of page cannot be less than or equal to 0`);
    }
  }
}
