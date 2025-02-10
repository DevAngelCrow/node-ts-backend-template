import { prismaClient } from "../../../../../shared/infrastructure/db/PrismaWrapper";
import { PeopleId, User, UserId, UserIdPeople, UserIdStatus, UserLastAccess, UserName, UserPassword, UserRepository } from "../../../domain";
import { PostgresUser } from "../../../../../shared/domain/types/postgres-types/postgresUser";
import { mapperToPrismaData } from './mapperToPrismaData';
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
export class ImplUserRepository implements UserRepository {
    private prisma = prismaClient;
    private users : User[] = [];
    async findByEmailPeople(id: PeopleId): Promise<User | null> {
        
        try {
            const user = await this.prisma.mnt_user.findFirst({
                where: { id_people: id.value },
                select: {
                    id_people: true,
                    id_status: true,
                    user_name: true,
                    last_access: true,
                    password: true,
                    id: true
                }
            });

            
            if(!user){
                return null;
            }
            return this.mapToDomain(user);

        } catch (error) {
            throw CustomError.internalServer("Internal server error in find email people");
        }
        
    }
    async create(user: User): Promise<void> {
        try {
            const userPrismaData = new mapperToPrismaData().mntUserToPrismaCreate(user)
            await this.prisma.mnt_user.create({
                data: userPrismaData
            });
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer("Internal server error in create user")
        }
        
    }
    update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: UserId): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: UserId): Promise<void> {
        throw new Error("Method not implemented.");
    }
   

    private mapToDomain(user: PostgresUser) : User{
        return new User(
            new UserIdPeople(user.id_people),
            new UserName(user.user_name),
            new UserPassword(user.password),
            new UserIdStatus(user.id_status),
            new UserLastAccess(user.last_access),
            new UserId(user.id)
        );
    }

}