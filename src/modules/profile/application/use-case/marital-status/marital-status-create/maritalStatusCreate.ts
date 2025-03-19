import { MaritalStatus, MaritalStatusName, MaritalStatusRepository } from "../../../../domain";

export class MaritalStatusCreate {
    constructor(private repository: MaritalStatusRepository){}

    async run(name: string) : Promise<void>{
        const maritalStatus = new MaritalStatus(
            new MaritalStatusName(name)
        );

        return this.repository.create(maritalStatus);
    }
}