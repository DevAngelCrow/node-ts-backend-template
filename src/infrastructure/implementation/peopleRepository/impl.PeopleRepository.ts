
import { CustomError, People, PeopleId, PeopleRepository } from "../../../domain";
import { prismaClient, PrismaClientKnownRequestError } from "../../db/PrismaWrapper";
import { PostgresPeople } from "../../../domain";
import { mapperToPrismaData } from "./mapperToPrismaData";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export class ImplPeopleRepository implements PeopleRepository {
    private people : People[] = [];
    private prisma  = prismaClient;

    async create(people: People): Promise<void> {
       try {
        
        const peoplePrismaData = new mapperToPrismaData().mntPeopleToPrismaCreate(people);

        await this.prisma.mnt_people.create({
            data: peoplePrismaData
        })
       } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){

            //console.log(error);
        }
        if(error instanceof PrismaClientUnknownRequestError){
            //console.log(error.constructor.name);
        }
        
        throw CustomError.internalServer("Internal server error");
       }
    }
    getAll(): Promise<People[]> {
        throw new Error("Method not implemented.");
    }
    getOneById(id: PeopleId): Promise<People | null> {
        throw new Error("Method not implemented.");
    }
    update(example: People): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: PeopleId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}