import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlPermission } from "./CtlPermission";
import { MntRol } from "./MntRol";

@Index("rol_permission_pk", ["id"], { unique: true })
@Entity("rol_permission", { schema: "public" })
export class RolPermission {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

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
    () => CtlPermission,
    (ctlPermission) => ctlPermission.rolPermissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_permission", referencedColumnName: "id" }])
  idPermission!: CtlPermission;

  @ManyToOne(() => MntRol, (mntRol) => mntRol.rolPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "id" }])
  idRol!: MntRol;
}
