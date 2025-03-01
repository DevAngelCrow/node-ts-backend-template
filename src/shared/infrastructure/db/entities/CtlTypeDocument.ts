import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntDocument } from "./MntDocument";

@Index("ctl_type_document_pk", ["id"], { unique: true })
@Entity("ctl_type_document", { schema: "public" })
export class CtlTypeDocument {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("character varying", { name: "description", nullable: true })
  description?: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt!: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @Column("boolean", { name: "state", nullable: true })
  state?: boolean | null;

  @OneToMany(() => MntDocument, (mntDocument) => mntDocument.idTypeDocument)
  mntDocuments!: MntDocument[];
}
