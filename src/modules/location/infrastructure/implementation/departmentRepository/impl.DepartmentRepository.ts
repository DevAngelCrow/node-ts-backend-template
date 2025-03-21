import { EntityManager } from "typeorm";
import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryState,
  Department,
  DepartmentDescription,
  DepartmentId,
  DepartmentIdCountry,
  DepartmentName,
  DepartmentRepository,
} from "../../../domain";
import { CtlDepartment } from "../../../../../shared/infrastructure/db/entities/CtlDepartment";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresDepartment } from "../../../../../shared/domain/types/postgres-types/postgresDepartment";

export class ImplDepartmentRepository
  implements DepartmentRepository<EntityManager>
{
  private departments: Department[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(
    department: Department,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const departmentRepo = manager.getRepository(CtlDepartment);
      const newDepartment = departmentRepo.create({
        name: department.name.value,
        description: department.description.value,
        idCountry: { id: department.id_country.value },
      });
      await departmentRepo.save(newDepartment);
    } catch (error) {
      console.log(error, "error")
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getAll(): Promise<Department[]> {
    try {
      const departmentRepo = this.entityManager.getRepository(CtlDepartment);
      const departments = await departmentRepo.find({
        select: {
          id: true,
          name: true,
          description: true,
          idCountry: {
            id: true,
            name: true,
            abbreviation: true,
            code: true,
            state: true,
          },
        },
        relations: {
          idCountry: true,
        },
      });
      this.departments = departments.map((department) => {
        return this.mapToDomain({
          id: department.id,
          name: department.name,
          description: department.description,
          id_country: department.idCountry.id,
          ctl_country: {
            id: department.idCountry.id,
            name: department.idCountry.name,
            abbreviation: department.idCountry.abbreviation ?? "",
            code: department.idCountry.code ?? "",
            state: department.idCountry.state ?? false,
          },
        });
      });
      return this.departments;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getOneById(
    id: DepartmentId,
    manager: EntityManager = this.entityManager
  ): Promise<Department | null> {
    try {
      const departmentRepo = manager.getRepository(CtlDepartment);
      const department = await departmentRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          name: true,
          description: true,
          idCountry: {
            id: true,
            name: true,
            abbreviation: true,
            code: true,
            state: true,
          },
        },
        relations: {
          idCountry: true,
        },
      });

      if (!department) {
        return null;
      }

      return this.mapToDomain({
        id: department.id,
        name: department.name,
        description: department.description,
        id_country: department.idCountry.id,
        ctl_country: {
          id: department.idCountry.id,
          name: department.idCountry.name,
          abbreviation: department.idCountry.abbreviation ?? "",
          code: department.idCountry.code ?? "",
          state: department.idCountry.state ?? false,
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(
    department: Department,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const departmentRepo = manager.getRepository(CtlDepartment);
      await departmentRepo.update(
        {id: department.id?.value},
        {
          name: department.name.value,
          description: department.description.value,
          idCountry: { id: department.id_country.value}
        }
      );
    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }
  async delete(
    id: DepartmentId,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      // const departmentRepo = manager.getRepository(CtlDepartment);
      // await departmentRepo.update(
      //   {id: id.value},
      //   {
          
      //   }
      // )
    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }

  private mapToDomain(department: PostgresDepartment) {
    return new Department(
      new DepartmentName(department.name),
      new DepartmentDescription(department.description ?? ""),
      new DepartmentIdCountry(department.id_country),
      new DepartmentId(department.id),
      new Country(
        new CountryName(department.ctl_country.name),
        new CountryAbbreviation(department.ctl_country.abbreviation),
        new CountryCode(department.ctl_country.code),
        new CountryState(department.ctl_country.state),
        new CountryId(department.ctl_country.id)
      )
    );
  }
}
