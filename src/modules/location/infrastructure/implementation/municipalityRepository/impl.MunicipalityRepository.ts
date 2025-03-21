import { EntityManager } from "typeorm";
import {
  Department,
  DepartmentDescription,
  DepartmentId,
  DepartmentIdCountry,
  DepartmentName,
  Municipality,
  MunicipalityDescription,
  MunicipalityId,
  MunicipalityIdDepartment,
  MunicipalityName,
  MunicipalityRepository,
} from "../../../domain";
import { CtlMunicipality } from "../../../../../shared/infrastructure/db/entities/CtlMunicipality";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresMunicipality } from "../../../../../shared/domain/types/postgres-types/postgresMunicipality";

export class ImplMunicipalityRepository
  implements MunicipalityRepository<EntityManager>
{
  private municipalities: Municipality[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(
    municipality: Municipality,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const municipalityRepo = manager.getRepository(CtlMunicipality);
      const newMunicipality = municipalityRepo.create({
        name: municipality.name.value,
        description: municipality.description.value,
        idDepartament: { id: municipality.id_department.value },
      });
      await municipalityRepo.save(newMunicipality);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getAll(): Promise<Municipality[]> {
    try {
      const municipalityRepo =
        this.entityManager.getRepository(CtlMunicipality);
      const municipalities = await municipalityRepo.find({
        select: {
          id: true,
          idDepartament: {
            id: true,
            name: true,
            description: true,
            idCountry: {
              id: true,
            },
          },
          name: true,
          description: true,
        },
        relations: {
          idDepartament: {
            idCountry: true,
          },
        },
      });

      this.municipalities = municipalities.map((municipality) => {
        return this.mapToDomain({
          id: municipality.id,
          id_department: municipality.idDepartament.id,
          name: municipality.name,
          description: municipality.description ?? "",
          ctl_department: {
            id: municipality.idDepartament.id,
            name: municipality.idDepartament.name,
            description: municipality.idDepartament.description ?? "",
            id_country: municipality.idDepartament.idCountry.id,
          },
        });
      });

      return this.municipalities;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getOneById(
    id: MunicipalityId,
    manager: EntityManager = this.entityManager
  ): Promise<Municipality | null> {
    try {
      const municipalityRepo = manager.getRepository(CtlMunicipality);
      const municipality = await municipalityRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          idDepartament: {
            id: true,
            name: true,
            description: true,
            idCountry: {
              id: true,
            },
          },
          name: true,
          description: true,
        },
        relations: {
          idDepartament: {
            idCountry: true,
          },
        },
      });

      if (!municipality) {
        return null;
      }

      return this.mapToDomain({
        id: municipality.id,
        id_department: municipality.idDepartament.id,
        name: municipality.name,
        description: municipality.description ?? "",
        ctl_department: {
          id: municipality.idDepartament.id,
          name: municipality.idDepartament.name,
          description: municipality.idDepartament.description ?? "",
          id_country: municipality.idDepartament.idCountry.id,
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(
    municipality: Municipality,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
        const municipalityRepo = manager.getRepository(CtlMunicipality);
        await municipalityRepo.update(
            {id: municipality.id?.value},
            {
                idDepartament: {id: municipality.id_department.value},
                name: municipality.name.value,
                description: municipality.description.value,
            }
        )
    } catch (error) {
        
    }
  }
  delete(
    id: MunicipalityId,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private mapToDomain(municipality: PostgresMunicipality) {
    return new Municipality(
      new MunicipalityIdDepartment(municipality.ctl_department.id),
      new MunicipalityName(municipality.name),
      new MunicipalityDescription(municipality.description ?? ""),
      new MunicipalityId(municipality.id),
      new Department(
        new DepartmentName(municipality.ctl_department.name),
        new DepartmentDescription(municipality.ctl_department.description ?? ""),
        new DepartmentIdCountry(municipality.ctl_department.id_country),
        new DepartmentId(municipality.ctl_department.id)
      )
    );
  }
}
