import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntPeople } from "./MntPeople";
import { CtlTypeInsurance } from "./CtlTypeInsurance";

@Index("mnt_insurance_pk", ["id"], { unique: true })
@Entity("mnt_insurance", { schema: "public" })
export class MntInsurance {
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

  @Column("boolean", { name: "state", nullable: true })
  state?: boolean | null;

  @ManyToOne(() => MntPeople, (mntPeople) => mntPeople.mntInsurances, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_people", referencedColumnName: "id" }])
  idPeople!: MntPeople;

  @ManyToOne(
    () => CtlTypeInsurance,
    (ctlTypeInsurance) => ctlTypeInsurance.mntInsurances,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_type_medical_insurance", referencedColumnName: "id" },
  ])
  idTypeMedicalInsurance!: CtlTypeInsurance;
}
