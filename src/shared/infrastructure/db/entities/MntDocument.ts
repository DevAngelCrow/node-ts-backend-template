import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentPeople } from "./DocumentPeople";
import { CtlTypeDocument } from "./CtlTypeDocument";

@Index("mnt_document_pk", ["id"], { unique: true })
@Entity("mnt_document", { schema: "public" })
export class MntDocument {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "description", nullable: true })
  description?: string | null;

  @Column("boolean", { name: "state", nullable: true })
  state?: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @OneToMany(
    () => DocumentPeople,
    (documentPeople) => documentPeople.idDocument
  )
  documentPeople!: DocumentPeople[];

  @ManyToOne(
    () => CtlTypeDocument,
    (ctlTypeDocument) => ctlTypeDocument.mntDocuments,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_type_document", referencedColumnName: "id" }])
  idTypeDocument!: CtlTypeDocument;
}
