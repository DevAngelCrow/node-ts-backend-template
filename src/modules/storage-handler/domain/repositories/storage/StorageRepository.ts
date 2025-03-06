import { MultimediaFile } from "../../../../../shared/domain/types";
import { PeopleImgPath } from "../../../../../shared/domain/domain-container/DomainContainer";

export interface StorageRepository {
    updload(multimedia: MultimediaFile) : Promise<string>;
    uploadMultiple(multimedias: MultimediaFile[]) : Promise<PeopleImgPath[]>;
    delete(id: string) : Promise<void>;
    get(id: string) : Promise<Buffer>;
}