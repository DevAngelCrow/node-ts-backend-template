import { PaginationLimit } from "../../../../../shared/domain/value-object/pagination.limit.value.object";
import { Pagination } from "../../../../../shared/domain/value-object/pagination.value.object";
import { District } from "../../entities";

export interface ResponseDistrict {
    data: District | District[];
    total_page?: number;
    page?: Pagination;
    limit?: PaginationLimit;
}