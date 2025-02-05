import {
  CustomError,
  PeopleStatus,
  PeopleStatusDescription,
  PeopleStatusId,
  PeopleStatusName,
  PeopleStatusRepository,
  PostgresPeopleStatus,
} from "../../../domain";
import { prismaClient } from "../../db/PrismaWrapper";

export class ImplPeopleStatusRepository implements PeopleStatusRepository {
  private people_status: PeopleStatus[] = [];
  private prisma = prismaClient;
  async getOneById(id: PeopleStatusId): Promise<PeopleStatus | null> {
    try {
      const peopleStatus = await this.prisma.ctl_status_people.findUnique({
        where: {
          id: id.value,
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

      return this.mapToDomain(peopleStatus);
    } catch (error) {
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
