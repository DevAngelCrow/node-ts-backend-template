import { DocumentDescription, DocumentId, DocumentIdTypeDocument, DocumentState } from "../../value-object";

export class Document {
    constructor(
        id_type_document: DocumentIdTypeDocument,
        description: DocumentDescription,
        state: DocumentState,
        id?: DocumentId
    ){}
}