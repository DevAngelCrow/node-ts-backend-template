import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleCountryStatus {
  constructor(readonly value: boolean) {
    //this.required()
  }

//   private required() {
//     if (!this.value) {
//       throw CustomError.badRequest("The field name is required");
//     }
//   }
}
