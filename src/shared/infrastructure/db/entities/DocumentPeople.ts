import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntDocument } from "./MntDocument";
import { MntPeople } from "./MntPeople";

@Index("document_people_pk", ["id"], { unique: true })
@Entity("document_people", { schema: "public" })
export class DocumentPeople {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => MntDocument, (mntDocument) => mntDocument.documentPeople, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_document", referencedColumnName: "id" }])
  idDocument!: MntDocument;

  @ManyToOne(() => MntPeople, (mntPeople) => mntPeople.documentPeople, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_people", referencedColumnName: "id" }])
  idPeople!: MntPeople;
}
