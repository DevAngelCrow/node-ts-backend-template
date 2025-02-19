import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntPeople } from "./MntPeople";

@Index("ctl_marital_status_pk", ["id"], { unique: true })
@Entity("ctl_marital_status", { schema: "public" })
export class CtlMaritalStatus {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "update_at", nullable: true })
  updateAt?: Date | null;

  @OneToMany(() => MntPeople, (mntPeople) => mntPeople.idMaritalStatus)
  mntPeople!: MntPeople[];
}
