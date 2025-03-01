import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlCountry } from "./CtlCountry";
import { CtlMunicipality } from "./CtlMunicipality";

@Index("ctl_department_pk", ["id"], { unique: true })
@Entity("ctl_department", { schema: "public" })
export class CtlDepartment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("character varying", { name: "description", nullable: true })
  description?: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => CtlCountry, (ctlCountry) => ctlCountry.ctlDepartments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_country", referencedColumnName: "id" }])
  idCountry!: CtlCountry;

  @OneToMany(
    () => CtlMunicipality,
    (ctlMunicipality) => ctlMunicipality.idDepartament
  )
  ctlMunicipalities!: CtlMunicipality[];
}
