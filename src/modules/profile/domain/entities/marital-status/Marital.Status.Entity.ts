import { MaritalStatusId, MaritalStatusName } from "../../../../auth/domain/value-object";

export class MaritalStatus{
    constructor(
        readonly name: MaritalStatusName,
        readonly id?: MaritalStatusId,
    ){}
}