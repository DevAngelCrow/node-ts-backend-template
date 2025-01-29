import { CustomError } from "../..";

export class AddressPathWay {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field pathway is required");
    }
  }
}
