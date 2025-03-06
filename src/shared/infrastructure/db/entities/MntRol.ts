import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlStatusRol } from "./CtlStatusRol";
import { RolPermission } from "./RolPermission";
import { UserRol } from "./UserRol";

@Index("mnt_rol_pk", ["id"], { unique: true })
@Entity("mnt_rol", { schema: "public" })
export class MntRol {
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

  @ManyToOne(() => CtlStatusRol, (ctlStatusRol) => ctlStatusRol.mntRols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_status", referencedColumnName: "id" }])
  idStatus!: CtlStatusRol;

  @OneToMany(() => RolPermission, (rolPermission) => rolPermission.idRol)
  rolPermissions!: RolPermission[];

  @OneToMany(() => UserRol, (userRol) => userRol.idRol)
  userRols!: UserRol[];
}
