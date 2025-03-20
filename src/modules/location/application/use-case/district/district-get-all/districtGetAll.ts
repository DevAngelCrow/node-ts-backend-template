import { District, DistrictRepository } from "../../../../domain";

export class DistrictGetAll <T=unknown>{
    constructor(private repository: DistrictRepository<T>){}

    async run() : Promise<District[]> {
        return this.repository.getAll();
    }
}