import { TypeDocument } from "../../entities";

export interface TypeDocumentRepository {
    create(type_document: TypeDocument) : Promise<void>
}