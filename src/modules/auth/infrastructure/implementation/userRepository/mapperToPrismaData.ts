import { Prisma } from "@prisma/client";
import { User } from "../../../domain";

export class mapperToPrismaData {
  mntUserToPrismaCreate(user: User): Prisma.mnt_userCreateInput {
    return {
      user_name: user.user_name.value,
      password: user.password.value,
      last_access: user.last_access.value,
      ctl_status_user: { connect: { id: user.id_status.value } },
      mnt_people: {
        connect: { id: user.id_people.value },
      },
    };
  }
  mntUserToPrismaUpdate(user: User): Prisma.mnt_peopleUpdateInput {
    return {};
  }
}
