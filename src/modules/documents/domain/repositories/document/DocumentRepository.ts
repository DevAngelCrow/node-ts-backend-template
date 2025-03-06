import { Document } from "../../entities";

export interface DocumentRepository {
    create(document: Document) : Promise<void>;
}