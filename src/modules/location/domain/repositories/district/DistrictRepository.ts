import { District } from "../../entities";
import { ParamsDistrict } from "../../interface/district/ParamsInterface";
import { ResponseDistrict } from "../../interface/district/ResponseInterface";
import { DistrictId } from "../../value-object";

export interface DistrictRepository <T>{
    create(district: District, transactionClient?: T): Promise<void>;
    getAll(params?: ParamsDistrict): Promise<ResponseDistrict>;
    getOneById(id: DistrictId, transactionClient?: T): Promise<District | null>;
    update(district: District, transactionClient?: T): Promise<void>;
    delete(id: DistrictId, transactionClient?: T): Promise<void>;
    //findMany(countries: DistrictId[], transactionClient?: T) : Promise<DistrictId[] | null>
}