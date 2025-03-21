import { EntityManager } from "typeorm";
import {
  Department,
  DepartmentIdCountry,
  District,
  DistrictDescription,
  DistrictId,
  DistrictIdMunicipality,
  DistrictName,
  DistrictRepository,
  DistrictState,
  Municipality,
  MunicipalityDescription,
  MunicipalityId,
  MunicipalityIdDepartment,
  MunicipalityName,
} from "../../../domain";
import { CtlDistrict } from "../../../../../shared/infrastructure/db/entities/CtlDistrict";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresDistrict } from "../../../../../shared/domain/types";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class ImplDistrictRepository
  implements DistrictRepository<EntityManager>
{
  private districts: District[] = [];
  constructor(private manager: EntityManager) {}
  async create(
    district: District,
    manager: EntityManager = this.manager
  ): Promise<void> {
    try {
      const districtRepo = manager.getRepository(CtlDistrict);
      const newDistrict = districtRepo.create({
        idMunicipality: { id: district.id_municipality.value },
        name: district.name.value,
        description: district.description.value,
        state: district.state.value,
      });

      await districtRepo.save(newDistrict);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getAll(): Promise<District[]> {
    try {
      const districtRepo = this.manager.getRepository(CtlDistrict);
      const districts = await districtRepo.find({
        select: {
          id: true,
          name: true,
          description: true,
          state: true,
          idMunicipality: {
            id: true,
            name: true,
            description: true,
            idDepartament: {
              id: true,
            },
          },
        },
        relations: {
          idMunicipality: {
            idDepartament: true,
          },
        },
      });
      this.districts = districts.map((district) => {
        return this.mapToDomain({
          id: district.id,
          id_municipality: district.idMunicipality.id,
          name: district.name,
          description: district.description,
          state: district.state,
          ctl_municipality: {
            id: district.idMunicipality.id,
            idDepartament: {
              id: district.idMunicipality.idDepartament.id,
            },
            name: district.idMunicipality.name,
            description: district.idMunicipality.description,
          },
        });
      });
      console.log(this.districts, 'this.district')
      return this.districts;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getOneById(
    id: DistrictId,
    manager: EntityManager = this.manager
  ): Promise<District | null> {
    try {
      const districtRepo = manager.getRepository(CtlDistrict);
      const district = await districtRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          name: true,
          description: true,
          state: true,
          idMunicipality: {
            id: true,
            name: true,
            description: true,
            idDepartament: {
              id: true,
            },
          },
        },
        relations: {
          idMunicipality: {
            idDepartament: true,
          },
        },
      });

      if (!district) {
        return null;
      }

      const districtFormated: PostgresDistrict = {
        id: district.id,
        id_municipality: district.idMunicipality.id,
        name: district.name,
        description: district.description,
        state: district.state,
        ctl_municipality: {
          id: district.idMunicipality.id,
          idDepartament: {
            id: district.idMunicipality.idDepartament.id,
          },
          name: district.idMunicipality.name,
          description: district.idMunicipality.description,
        },
      };

      return this.mapToDomain(districtFormated);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(
    district: District,
    manager: EntityManager = this.manager
  ): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const districtRepo = manager.getRepository(CtlDistrict);
      await districtRepo.update(
        { id: district.id?.value },
        {
          name: district.name.value,
          idMunicipality: {id: district.id_municipality.value},
          description: district.description.value,
          state: district.state.value,
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss"),
        }
      );
    } catch (error) {
      console.log(error, "esto es error");
      throw CustomError.internalServer("Internal server error");
    }
  }
  async delete(id: DistrictId, manager: EntityManager = this.manager): Promise<void> {
    try {
        const dt = new DateTimeService().dateTime;
        const districtRepo = manager.getRepository(CtlDistrict);

        await districtRepo.update(
            {id: id.value},
            {state: false, deletedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss")}
        );
    } catch (error) {
        throw CustomError.internalServer("Internal server error")
    }
  }
  //   findMany(
  //     countries: DistrictId[],
  //     manager: EntityManager = this.manager
  //   ): Promise<DistrictId[] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  private mapToDomain(district: PostgresDistrict) {
    return new District(
      new DistrictIdMunicipality(district.id_municipality),
      new DistrictName(district.name),
      new DistrictDescription(district.description ?? ""),
      new DistrictState(district.state ?? false),
      new DistrictId(district.id),
      new Municipality(
        new MunicipalityIdDepartment(
          district.ctl_municipality.idDepartament.id
        ),
        new MunicipalityName(district.ctl_municipality.name),
        new MunicipalityDescription(
          district.ctl_municipality.description ?? ""
        ),
        new MunicipalityId(district.ctl_municipality.id)
      )
    );
  }
}
