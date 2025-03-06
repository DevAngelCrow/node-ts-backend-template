import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlDistrict } from "./CtlDistrict";
import { CtlDepartment } from "./CtlDepartment";

@Index("ctl_municipality_pk", ["id"], { unique: true })
@Entity("ctl_municipality", { schema: "public" })
export class CtlMunicipality {
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

  @OneToMany(() => CtlDistrict, (ctlDistrict) => ctlDistrict.idMunicipality)
  ctlDistricts!: CtlDistrict[];

  @ManyToOne(
    () => CtlDepartment,
    (ctlDepartment) => ctlDepartment.ctlMunicipalities,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_departament", referencedColumnName: "id" }])
  idDepartament!: CtlDepartment;
}
