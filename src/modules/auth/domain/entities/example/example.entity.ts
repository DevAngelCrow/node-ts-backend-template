import { ExampleId, ExampleValue } from "../../value-object/index";
export class Example {
    constructor(
        readonly example: ExampleValue,
        readonly id?: ExampleId
    ){}

    public mapToPrimitives(){
        /* 
        return {
        example: this.example.value
        }
        */
    }
}