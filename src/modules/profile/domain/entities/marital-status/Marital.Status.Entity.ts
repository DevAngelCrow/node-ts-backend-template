import { MaritalStatusId, MaritalStatusName } from "../../../../auth/domain/value-object";

export class MaritalStatus{
    constructor(
        readonly name: MaritalStatusName,
        readonly id?: MaritalStatusId,
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            name: this.name.value
        }
    }
}