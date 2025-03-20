import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { District, DistrictDescription, DistrictId, DistrictIdMunicipality, DistrictName, DistrictRepository, DistrictState } from "../../../../domain";

export class DistrictUpdate <T = unknown>{
    constructor(private repository: DistrictRepository<T>){}
    async run(id: number, id_municipality: number, name: string, description: string, state: boolean) : Promise<void> {
        
        const district = new District(
            new DistrictIdMunicipality(id_municipality),
            new DistrictName(name),
            new DistrictDescription(description),
            new DistrictState(state),
            new DistrictId(id)
        );
        

        const districtDb  = await this.repository.getOneById(new DistrictId(id));
        //)
        if(!districtDb){
            throw CustomError.notFound("Id district not found")
        }

        return this.repository.update(district);
    }
}