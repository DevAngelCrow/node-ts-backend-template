import { PaginationLimit } from "../../../../../shared/domain/value-object/pagination.limit.value.object";
import { Pagination } from "../../../../../shared/domain/value-object/pagination.value.object";
import { DistrictName } from "../../value-object";


export interface ParamsDistrict {
    page: Pagination;
    limit: PaginationLimit;
    filter?: DistrictName | null;
}