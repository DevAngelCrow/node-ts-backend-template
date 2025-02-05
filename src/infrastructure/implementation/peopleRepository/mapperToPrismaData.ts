import { Prisma } from "@prisma/client";
import { CountryId, People } from "../../../domain";

export class mapperToPrismaData {
    mntPeopleToPrismaCreate(people: People): Prisma.mnt_peopleCreateInput {
        let nationalities : {[key:string] : number} [] = [];
        people.nationality.map((nation) => {
            if(nation instanceof CountryId){
                nationalities.push({id_country: nation.value})
            }
        })
        return {
            first_name: people.first_name.value,
            middle_name: people?.middle_name?.value ?? null,
            last_name: people?.last_name?.value ?? null,
            birthdate: people.birthdate.value,
            email: people.email.value,
            img_path: people?.img_path?.value ?? null,
            phone: people.phone.value,
            has_insurance: people?.has_insurance?.value ?? null,
            ctl_gender: { connect: { id: people.id_gender.value } },
            ctl_marital_status: { connect: { id: people.id_marital_status.value }},
            ctl_status_people: { connect: { id: people.id_status.value }},
            people_country: {
                create: nationalities.map((nationality) => ({ctl_country: { connect: { id: +nationality.id_country }}}))
                // people.nationality.map((nationality) => ({ctl_country: { connect: { id: +nationality }}}))
            }
        }
    }
    mntPeopleToPrismaUpdate(people: People): Prisma.mnt_peopleUpdateInput {
        let nationalities : number [] = [];  
        people.nationality.map((item) => {
            if(item instanceof CountryId){
                nationalities.push(item.value);
            }
        });

        return {
            first_name: people.first_name.value,
            middle_name: people?.middle_name?.value ?? null,
            last_name: people?.last_name?.value ?? null,
            birthdate: people.birthdate.value,
            email: people.email.value,
            img_path: people?.img_path?.value ?? null,
            phone: people.phone.value,
            has_insurance: people?.has_insurance?.value ?? null,
            updated_at: new Date(Date.now()),
            ctl_gender: { connect: { id: people.id_gender.value } },
            ctl_marital_status: { connect: { id: people.id_marital_status.value }},
            ctl_status_people: { connect: { id: people.id_status.value }},
        }
    }
}