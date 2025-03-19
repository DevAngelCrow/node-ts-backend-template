import { PeopleStatus, PeopleStatusDescription, PeopleStatusName, PeopleStatusRepository } from "../../../../domain";

export class PeopleStatusCreate {
    constructor(private repository: PeopleStatusRepository){}

    async run(name: string, description: string) : Promise<void> {
        const peopleStatus = new PeopleStatus(
            new PeopleStatusName(name),
            new PeopleStatusDescription(description)
        );

        return this.repository.create(peopleStatus);
    }
}