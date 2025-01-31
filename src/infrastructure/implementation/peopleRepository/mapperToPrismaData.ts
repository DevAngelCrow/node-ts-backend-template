import { Prisma } from "@prisma/client";
import { People } from "../../../domain";

export class mapperToPrismaData {
    mntPeopleToPrismaCreate(people: People): Prisma.mnt_peopleCreateInput {
        return {
            first_name: people.first_name.value,
            middle_name: people.middle_name.value,
            last_name: people.last_name.value,
            birthdate: people.birthdate.value,
            email: people.email.value,
            img_path: people.img_path.value,
            phone: people.phone.value,
            has_insurance: people.has_insurance.value,
            ctl_gender: { connect: { id: people.id_gender.value } },
            ctl_marital_status: { connect: { id: people.id_marital_status.value }},
            ctl_status_people: { connect: { id: people.id_status.value }},
            people_country: {
                
                create: people.nationality.map((nationality) => ({ctl_country: { connect: { id: +nationality.value}}}))
            }
        }
    }
    mntPeopleToPrismaUpdate(people: People): Prisma.mnt_peopleUpdateInput {
        throw 'test'
    }
}