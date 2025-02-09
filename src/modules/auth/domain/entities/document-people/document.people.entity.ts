import { DocumentPeopleId, DocumentPeopleIdDocument, DocumentPeopleIdPeople } from "../../value-object";

export class DocumentPeople{
    constructor(
        readonly id_document: DocumentPeopleIdDocument,
        readonly id_people: DocumentPeopleIdPeople,
        readonly id?: DocumentPeopleId
    ){}

}