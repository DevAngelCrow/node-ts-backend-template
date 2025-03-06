import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlDepartment } from "./CtlDepartment";
import { PeopleCountry } from "./PeopleCountry";

@Index("ctl_country_pk", ["id"], { unique: true })
@Entity("ctl_country", { schema: "public" })
export class CtlCountry {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("character varying", { name: "abbreviation", nullable: true })
  abbreviation?: string | null;

  @Column("character varying", { name: "code", nullable: true })
  code?: string | null;

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

  @OneToMany(() => CtlDepartment, (ctlDepartment) => ctlDepartment.idCountry)
  ctlDepartments!: CtlDepartment[];

  @OneToMany(() => PeopleCountry, (peopleCountry) => peopleCountry.idCountry)
  peopleCountries!: PeopleCountry[];
}
