import { GenderId, GenderName } from "../../value-object";

export class Gender {
    constructor(
        readonly name: GenderName,
        readonly id?: GenderId
    ){}
}