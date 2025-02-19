import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntRol } from "./MntRol";
import { MntUser } from "./MntUser";

@Index("user_rol_pk", ["id"], { unique: true })
@Entity("user_rol", { schema: "public" })
export class UserRol {
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

  @ManyToOne(() => MntRol, (mntRol) => mntRol.userRols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "id" }])
  idRol!: MntRol;

  @ManyToOne(() => MntUser, (mntUser) => mntUser.userRols, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  idUser!: MntUser;
}
