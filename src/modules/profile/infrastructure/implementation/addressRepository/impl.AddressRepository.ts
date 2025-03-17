import { EntityManager, QueryFailedError } from "typeorm";
import {
  AddressActive,
  AddressBlock,
  AddressCurrent,
  AddressDescription,
  AddressHouseNumber,
  AddressId,
  AddressIdDistrict,
  AddressIdPeople,
  AddressNeighborhood,
  AddressPathWay,
  AddressRepository,
  AddressStreet,
  AddressStreetNumber,
  PeopleId,
} from "../../../domain";
import { Address } from "../../../../profile/domain/entities/address/address.entity";
import { MntAddress } from "../../../../../shared/infrastructure/db/entities/MntAddress";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresAddress } from "../../../../../shared/domain/types/postgres-types/postgresAddress";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class ImplAddressRepository implements AddressRepository<EntityManager> {
  private addresses: Address[] = [];
  constructor(private entityManager: EntityManager) {}
  
  async create(
    address: Address,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const addressRepo = manager.getRepository(MntAddress);
      const newAddress = addressRepo.create({
        idPeople: { id: address.id_people.value },
        street: address.street.value,
        streetNumber: address.street_number.value,
        neighborhood: address.neighborhood.value,
        idDistrict: { id: address.id_district.value },
        houseNumber: address.house_number.value,
        block: address.block.value,
        pathway: address.pathway.value,
        description: address.description?.value,
        current: address.current.value,
      });
      await addressRepo.insert(newAddress);
    } catch (error) {
      if(error instanceof QueryFailedError){
        //console.log(error.driverError.detail);
        const regex = /\(\s*([^()]*)\s*\)/g
        const respuestaError = error.driverError.detail.match(regex)
        let stringErrorDetail : string = ""
        respuestaError.forEach((element: string, index: number) => {
          stringErrorDetail = `${stringErrorDetail}${element.substring(1, element.length - 1)} ${index === respuestaError.length - 1 ? '' : '=> '}` 
        });
        
        throw CustomError.badRequest(`${stringErrorDetail} not found`)
      
      }
      
      throw CustomError.internalServer(
        "Internal server error in create address"
      );
    }
  }
  async update(
    address: Address,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const addressRepo = manager.getRepository(MntAddress);
      await addressRepo.update(
        {
          id: address.id?.value,
        },
        {
          idPeople: { id: address.id_people.value },
          street: address.street.value,
          streetNumber: address.street_number.value,
          neighborhood: address.neighborhood.value,
          idDistrict: { id: address.id_district.value },
          houseNumber: address.house_number.value,
          block: address.block.value,
          pathway: address.pathway.value,
          description: address.description?.value,
          current: address.current.value,
          active: address.active.value,
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss")
        }
      );
    } catch (error) {
      console.log(error, "error")
      throw CustomError.internalServer(
        "Internal server error updating address"
      );
    }
  }
  async getAll(): Promise<Address[]> {
    try {
      const addressRepo = this.entityManager.getRepository(MntAddress);
      const addresses = await addressRepo
        .createQueryBuilder("address")
        .innerJoin("address.idPeople", "mntPeople")
        .innerJoin("address.idDistrict", "ctlDistrict")
        .innerJoin("ctlDistrict.idMunicipality", "ctlMunicipality")
        .innerJoin("ctlMunicipality.idDepartament", "ctlDepartment")
        .innerJoin("ctlDepartment.idCountry", "ctlCountry")
        .select([
          "address.id",
          "address.street",
          "address.streetNumber",
          "address.neighborhood",
          "address.houseNumber",
          "address.block",
          "address.pathway",
          "address.description",
          "address.current",
          "mntPeople.firstName",
          "mntPeople.middleName",
          "mntPeople.lastName",
          "mntPeople.email",
          "mntPeople.id",
          "ctlDistrict.id",
          "ctlDistrict.name",
          "ctlMunicipality.id",
          "ctlMunicipality.name",
          "ctlDepartment.id",
          "ctlDepartment.name",
          "ctlCountry.id",
          "ctlCountry.name",
        ])
        .getMany();

      this.addresses = addresses.map((address) => {
        return this.mapToDomain({
          id: address.id,
          street: address.street ?? "-",
          street_number: address.streetNumber ?? "-",
          neighborhood: address.neighborhood ?? "-",
          id_district: address.idDistrict.id,
          house_number: address.houseNumber,
          block: address.block ?? "-",
          pathway: address.pathway ?? "-",
          description: address.description ?? "-",
          current: address.current ?? false,
          active: address.active,
          person: {
            id: address.idPeople.id,
            first_name: address.idPeople.firstName,
            middle_name: address.idPeople.middleName ?? "",
            last_name: address.idPeople.lastName ?? "",
            email: address.idPeople.email,
          },
          ctl_district: {
            id: address.idDistrict.id,
            name: address.idDistrict.name,
          },
          ctl_municipality: {
            id: address.idDistrict.idMunicipality.id,
            name: address.idDistrict.idMunicipality.name,
          },
          ctl_department: {
            id: address.idDistrict.idMunicipality.idDepartament.id,
            name: address.idDistrict.idMunicipality.idDepartament.name,
          },
          ctl_country: {
            id: address.idDistrict.idMunicipality.idDepartament.idCountry.id,
            name: address.idDistrict.idMunicipality.idDepartament.idCountry
              .name,
          },
        });
      });
      return this.addresses;
    } catch (error) {}
    throw CustomError.internalServer("Internal server error in get Address");
  }
  async getOneById(id: AddressId): Promise<Address | null> {
    try {
      const addressRepo = this.entityManager.getRepository(MntAddress);
      const addressFind = await addressRepo
        .createQueryBuilder("address")
        .innerJoin("address.idPeople", "mntPeople")
        .innerJoin("address.idDistrict", "ctlDistrict")
        .innerJoin("ctlDistrict.idMunicipality", "ctlMunicipality")
        .innerJoin("ctlMunicipality.idDepartament", "ctlDepartment")
        .innerJoin("ctlDepartment.idCountry", "ctlCountry")
        .select([
          "address.id",
          "address.street",
          "address.streetNumber",
          "address.neighborhood",
          "address.houseNumber",
          "address.block",
          "address.pathway",
          "address.description",
          "address.current",
          "address.active",
          "mntPeople.firstName",
          "mntPeople.middleName",
          "mntPeople.lastName",
          "mntPeople.email",
          "mntPeople.id",
          "ctlDistrict.id",
          "ctlDistrict.name",
          "ctlMunicipality.id",
          "ctlMunicipality.name",
          "ctlDepartment.id",
          "ctlDepartment.name",
          "ctlCountry.id",
          "ctlCountry.name",
        ])
        .where("address.id = :id", { id: id.value })
        .getOne();

        console.log(addressFind, 'address find')
      if (!addressFind) {
        return null;
      }

      return this.mapToDomain({
        id: addressFind.id,
        street: addressFind.street ?? "-",
        street_number: addressFind.streetNumber ?? "-",
        neighborhood: addressFind.neighborhood ?? "-",
        id_district: addressFind.idDistrict.id,
        house_number: addressFind.houseNumber,
        block: addressFind.block ?? "-",
        pathway: addressFind.pathway ?? "-",
        description: addressFind.description ?? "-",
        current: addressFind.current ?? false,
        active: addressFind.active,
        person: {
          id: addressFind.idPeople.id,
          first_name: addressFind.idPeople.firstName,
          middle_name: addressFind.idPeople.middleName ?? "",
          last_name: addressFind.idPeople.lastName ?? "",
          email: addressFind.idPeople.email,
        },
        ctl_district: {
          id: addressFind.idDistrict.id,
          name: addressFind.idDistrict.name,
        },
        ctl_municipality: {
          id: addressFind.idDistrict.idMunicipality.id,
          name: addressFind.idDistrict.idMunicipality.name,
        },
        ctl_department: {
          id: addressFind.idDistrict.idMunicipality.idDepartament.id,
          name: addressFind.idDistrict.idMunicipality.idDepartament.name,
        },
        ctl_country: {
          id: addressFind.idDistrict.idMunicipality.idDepartament.idCountry.id,
          name: addressFind.idDistrict.idMunicipality.idDepartament.idCountry
            .name,
        },
      });
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Internal server error");
    }
  }
  async delete(
    id: AddressId,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const addressRepo = manager.getRepository(MntAddress);
      await addressRepo.update(
        { id: id.value },
        { deletedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss"), active: false, current: false }
      );
    } catch (error) {
      console.log(error, 'error delete')
      throw CustomError.internalServer("Internal server error");
    }
  }
  async changePlaceResidence(id: AddressIdPeople, manager: EntityManager = this.entityManager): Promise<void> {
    try {
      console.log(id, 'id que viene')
      const dt = new DateTimeService().dateTime;
      const addressRepo = manager.getRepository(MntAddress);
      await addressRepo.update(
        {idPeople: {id: id.value}, current: true},
        { current: false,
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss")
         }
      );
    } catch (error) {
      console.log(error, 'error')
      throw CustomError.internalServer("Internal server error");
    }
    
  }

  private mapToDomain(address: PostgresAddress) {
    const location = {
      district: address.ctl_district,
      municipality: address.ctl_municipality,
      department: address.ctl_department,
      country: address.ctl_country,
    };
    return new Address(
      new AddressIdPeople(address.person.id),
      new AddressStreet(address.street),
      new AddressStreetNumber(address.street),
      new AddressNeighborhood(address.neighborhood),
      new AddressIdDistrict(address.id_district),
      new AddressHouseNumber(address.house_number),
      new AddressBlock(address.block),
      new AddressPathWay(address.pathway),
      new AddressCurrent(address.current),
      new AddressActive(address.active),
      new AddressDescription(address.description),
      new AddressId(address.id),
      location,
      address.person
    );
  }
}
