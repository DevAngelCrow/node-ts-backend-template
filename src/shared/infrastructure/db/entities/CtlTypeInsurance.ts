import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntInsurance } from "./MntInsurance";

@Index("ctl_type_insurance_pk", ["id"], { unique: true })
@Entity("ctl_type_insurance", { schema: "public" })
export class CtlTypeInsurance {
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

  @OneToMany(
    () => MntInsurance,
    (mntInsurance) => mntInsurance.idTypeMedicalInsurance
  )
  mntInsurances!: MntInsurance[];
}
