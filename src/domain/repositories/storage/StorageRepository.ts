import { MultimediaFile } from "../../types";
import { PeopleImgPath } from "../../value-object";

export interface StorageRepository {
    updload(multimedia: MultimediaFile) : Promise<string>;
    uploadMultiple(multimedias: MultimediaFile[]) : Promise<PeopleImgPath[]>
}