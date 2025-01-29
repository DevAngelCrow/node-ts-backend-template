import { AddressBlock, AddressHouseNumber, AddressIdDepartment, AddressIdDistrict, AddressIdMunicipality, AddressIdPeople, AddressNeighborhood, AddressPathWay, AddressStreet, AddressStreetNumber } from "../../value-object";

export class Address{
    constructor(
        readonly id_people: AddressIdPeople,
        readonly street: AddressStreet,
        readonly street_number: AddressStreetNumber,
        readonly neighborhood: AddressNeighborhood,
        readonly id_department: AddressIdDepartment,
        readonly id_municipality: AddressIdMunicipality,
        readonly id_district: AddressIdDistrict,
        readonly house_number: AddressHouseNumber,
        readonly block: AddressBlock,
        readonly pathway: AddressPathWay
    ){}
}