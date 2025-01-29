import { People, PeopleId, PeopleRepository } from "../../../domain";

export class ImplPeopleRepository implements PeopleRepository {
    private people : People[] = [];

    create(example: People): Promise<void> {
        throw new Error("Method not implemented.");
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