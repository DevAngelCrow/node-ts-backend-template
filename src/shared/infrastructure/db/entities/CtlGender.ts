import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntPeople } from "./MntPeople";

@Index("ctl_gender_pk", ["id"], { unique: true })
@Entity("ctl_gender", { schema: "public" })
export class CtlGender {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @OneToMany(() => MntPeople, (mntPeople) => mntPeople.idGender)
  mntPeople?: MntPeople[];
}
