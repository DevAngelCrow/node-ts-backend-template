import { PaginationLimit } from "../../../../../../shared/domain/value-object/pagination.limit.value.object";
import { Pagination } from "../../../../../../shared/domain/value-object/pagination.value.object";
import { DistrictName, DistrictRepository } from "../../../../domain";
import { ParamsDistrict } from "../../../../domain/interface/district/ParamsInterface";
import { ResponseDistrict } from "../../../../domain/interface/district/ResponseInterface";
interface Params {
  page: number;
  filter?: string;
  limit: number;
}
export class DistrictGetAll<T = unknown> {
  constructor(private repository: DistrictRepository<T>) {}

  async run(params?: Params): Promise<ResponseDistrict> {
    if (params) {
      let { page = 1, limit, filter } = params;
      const paramsDistrict: ParamsDistrict = {
        page: new Pagination(page),
        limit: new PaginationLimit(limit),
      };
      if (params.filter) {
        paramsDistrict.filter = new DistrictName(filter!);
      }

      return this.repository.getAll(paramsDistrict);
    }

    return this.repository.getAll();
  }
}
