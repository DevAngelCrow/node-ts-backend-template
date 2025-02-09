import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleHasInsurance {
  constructor(readonly value: boolean) {
    //this.required()
  }

//   private required() {
//     if (!this.value) {
//       throw CustomError.badRequest("The field has_insurance is required");
//     }
//   }
}
