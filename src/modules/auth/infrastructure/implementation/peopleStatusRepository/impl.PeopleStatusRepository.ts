import {
  
  PeopleStatus,
  PeopleStatusDescription,
  PeopleStatusId,
  PeopleStatusName,
  PeopleStatusRepository,
} from "../../../domain";
import { prismaClient } from "../../../../../shared/infrastructure/db/PrismaWrapper";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresPeopleStatus } from "../../../../../shared/domain/types";

export class ImplPeopleStatusRepository implements PeopleStatusRepository {
  private people_status: PeopleStatus[] = [];
  private prisma = prismaClient;
  getAll(): Promise<PeopleStatus[]> {
    throw new Error("Method not implemented.");
  }
  async getOneById(status_name: PeopleStatusName): Promise<PeopleStatusId | null> {
    try {
      const peopleStatus = await this.prisma.ctl_status_people.findFirst({
        where: {
          name: status_name.value,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });

      if (!peopleStatus) {
         return null;
      }

      return new PeopleStatusId(+peopleStatus.id);

    } catch (error) {
      console.log(error, 'error en peopleStatus')
      throw CustomError.internalServer("Internal server error");
    }
    
  }
  private mapToDomain(peopleStatus: PostgresPeopleStatus): PeopleStatus {
    return new PeopleStatus(
      new PeopleStatusName(peopleStatus.name),
      new PeopleStatusDescription(peopleStatus?.description),
      new PeopleStatusId(peopleStatus.id),
    );
  }
}
