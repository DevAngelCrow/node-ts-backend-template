import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolPermission } from "./RolPermission";

@Index("ctl_permission_pk", ["id"], { unique: true })
@Entity("ctl_permission", { schema: "public" })
export class CtlPermission {
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

  @OneToMany(() => RolPermission, (rolPermission) => rolPermission.idPermission)
  rolPermissions!: RolPermission[];
}
