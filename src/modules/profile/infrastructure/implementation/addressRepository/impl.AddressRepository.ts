import { EntityManager } from "typeorm";
import {
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
} from "../../../domain";
import { Address } from "../../../../profile/domain/entities/address/address.entity";
import { MntAddress } from "../../../../../shared/infrastructure/db/entities/MntAddress";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresAddress } from "../../../../../shared/domain/types/postgres-types/postgresAddress";
import { District } from "../../../../location/domain";

export class ImplAddressRepository implements AddressRepository<EntityManager> {
  private address: Address[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(
    address: Address,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const addressRepo = manager.getRepository(MntAddress);
      const newAddress = await addressRepo.create({
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
      await addressRepo.save(newAddress);
    } catch (error) {
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
        }
      );
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error updating address"
      );
    }
  }
  getAll(): Promise<Address[]> {
    throw new Error("Method not implemented.");
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
      if (!addressFind) {
        return null;
      }
      
      return this.mapToDomain({
        id: addressFind.id,
        id_people: addressFind.idPeople.id,
        street: addressFind.street ?? "-",
        street_number: addressFind.streetNumber ?? "-",
        neighborhood: addressFind.neighborhood ?? "-",
        id_district: addressFind.idDistrict.id,
        house_number: addressFind.houseNumber,
        block: addressFind.block ?? "-",
        pathway: addressFind.pathway ?? "-",
        description: addressFind.description ?? "-",
        current: addressFind.current ?? false,
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
    //throw new Error("Method not implemented.");
  }
  delete(
    id: AddressId,
    transaction?: EntityManager | undefined
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private mapToDomain(address: PostgresAddress) {
    const location = {
      district: address.ctl_district,
      municipality: address.ctl_municipality,
      department: address.ctl_department,
      country: address.ctl_country,
    };
    return new Address(
      new AddressIdPeople(address.id_people),
      new AddressStreet(address.street),
      new AddressStreetNumber(address.street),
      new AddressNeighborhood(address.neighborhood),
      new AddressIdDistrict(address.id_district),
      new AddressHouseNumber(address.house_number),
      new AddressBlock(address.block),
      new AddressPathWay(address.pathway),
      new AddressCurrent(address.current),
      new AddressId(address.id),
      new AddressDescription(address.description),
      location
    );
  }
}
