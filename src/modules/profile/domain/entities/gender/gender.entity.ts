import { GenderId, GenderName } from "../../value-object";

export class Gender {
    constructor(
        readonly name: GenderName,
        readonly id?: GenderId
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            name: this.name.value 
        }
    }
}