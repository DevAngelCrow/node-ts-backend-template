import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntRol } from "./MntRol";

@Index("ctl_status_rol_pk", ["id"], { unique: true })
@Entity("ctl_status_rol", { schema: "public" })
export class CtlStatusRol {
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

  @Column("timestamp without time zone", {
    name: "udpataed_at",
    nullable: true,
  })
  udpataedAt!: Date | null;

  @OneToMany(() => MntRol, (mntRol) => mntRol.idStatus)
  mntRols!: MntRol[];
}
