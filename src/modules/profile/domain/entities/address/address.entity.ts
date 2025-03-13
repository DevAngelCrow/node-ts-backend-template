import { Country, Department, District, Municipality } from "../../../../../shared/domain/domain-container/DomainContainer"
import { AddressCurrent, AddressDescription, AddressBlock, AddressHouseNumber, AddressIdDistrict, AddressIdPeople, AddressNeighborhood, AddressPathWay, AddressStreet, AddressStreetNumber, AddressId } from "../../../../profile/domain";

export class Address{
    constructor(
        readonly id_people: AddressIdPeople,
        readonly street: AddressStreet,
        readonly street_number: AddressStreetNumber,
        readonly neighborhood: AddressNeighborhood,
        readonly id_district: AddressIdDistrict,
        readonly house_number: AddressHouseNumber,
        readonly block: AddressBlock,
        readonly pathway: AddressPathWay,
        readonly current: AddressCurrent,
        readonly id?: AddressId,
        readonly description?: AddressDescription,
        readonly ctl_district?: {[key:string]: any },
    ){}

    public mapToPrimitives(){
        return {
         id: this.id?.value,
         description: this.description?.value,
         id_people: this.id_people.value,
         street: this.street.value,
         street_number: this.street_number.value,
         neighborhood: this.neighborhood.value,
         house_number: this.house_number.value,
         block: this.block.value,
         pathway: this.pathway.value,
         current: this.current.value,
         location: this.ctl_district,
        }
    }

    
    
}