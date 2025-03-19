import { PeopleStatusDescription, PeopleStatusId, PeopleStatusName } from "../../value-object";

export class PeopleStatus {
    constructor(
        readonly name: PeopleStatusName,
        readonly description?: PeopleStatusDescription,
        readonly id?: PeopleStatusId
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            name: this.name.value,
            description: this.description?.value
        }
    }
}