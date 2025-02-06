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
  getAll(): Promise<PeopleStatus[]> {
    throw new Error("Method not implemented.");
  }
  private people_status: PeopleStatus[] = [];
  private prisma = prismaClient;
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

      return new PeopleStatusId(peopleStatus.id);
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
