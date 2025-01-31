import { PeopleId, PeopleStatusDescription, PeopleStatusName } from "../../value-object";

export class PeopleStatus {
    constructor(
        readonly name: PeopleStatusName,
        readonly description: PeopleStatusDescription,
        readonly id?: PeopleId
    ){}
}