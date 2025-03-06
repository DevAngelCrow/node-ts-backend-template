import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlMunicipality } from "./CtlMunicipality";
import { MntAddress } from "./MntAddress";

@Index("ctl_district_pk", ["id"], { unique: true })
@Entity("ctl_district", { schema: "public" })
export class CtlDistrict {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

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

  @ManyToOne(
    () => CtlMunicipality,
    (ctlMunicipality) => ctlMunicipality.ctlDistricts,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_municipality", referencedColumnName: "id" }])
  idMunicipality!: CtlMunicipality;

  @OneToMany(() => MntAddress, (mntAddress) => mntAddress.idDistrict)
  mntAddresses!: MntAddress[];
}
