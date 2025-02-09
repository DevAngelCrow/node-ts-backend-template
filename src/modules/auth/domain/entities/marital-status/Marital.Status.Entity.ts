import { MaritalStatusId, MaritalStatusName } from "../../value-object";

export class MaritalStatus{
    constructor(
        readonly name: MaritalStatusName,
        readonly id?: MaritalStatusId,
    ){}
}