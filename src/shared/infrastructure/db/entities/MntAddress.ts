import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlDistrict } from "./CtlDistrict";
import { MntPeople } from "./MntPeople";

@Index("mnt_address_pk", ["id"], { unique: true })
@Entity("mnt_address", { schema: "public" })
export class MntAddress {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "street", nullable: true })
  street?: string | null;

  @Column("character varying", { name: "street_number", nullable: true })
  streetNumber?: string | null;

  @Column("character varying", { name: "neighborhood", nullable: true })
  neighborhood?: string | null;

  @Column("integer", { name: "house_number" })
  houseNumber!: number;

  @Column("character varying", { name: "block", nullable: true })
  block?: string | null;

  @Column("character varying", { name: "pathway", nullable: true })
  pathway?: string | null;

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

  @Column("boolean", { name: "current", nullable: true })
  current?: boolean | null;
  @Column("boolean", {name: "active", default: true})
  active!: boolean;
  @ManyToOne(() => CtlDistrict, (ctlDistrict) => ctlDistrict.mntAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_district", referencedColumnName: "id" }])
  idDistrict!: CtlDistrict;

  @ManyToOne(() => MntPeople, (mntPeople) => mntPeople.mntAddresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_people", referencedColumnName: "id" }])
  idPeople!: MntPeople;
}
