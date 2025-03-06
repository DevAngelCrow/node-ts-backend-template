import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MntPeople } from "./MntPeople";
import { CtlStatusUser } from "./CtlStatusUser";
import { UserRol } from "./UserRol";

@Index("mnt_user_pk", ["id"], { unique: true })
@Entity("mnt_user", { schema: "public" })
export class MntUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "user_name" })
  userName!: string;

  @Column("character varying", { name: "password" })
  password!: string;

  @Column("timestamp without time zone", {
    name: "last_access",
    default: () => "now()",
  })
  lastAccess!: Date;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => MntPeople, (mntPeople) => mntPeople.mntUsers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_people", referencedColumnName: "id" }])
  idPeople!: MntPeople;

  @ManyToOne(() => CtlStatusUser, (ctlStatusUser) => ctlStatusUser.mntUsers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_status", referencedColumnName: "id" }])
  idStatus!: CtlStatusUser;

  @OneToMany(() => UserRol, (userRol) => userRol.idUser)
  userRols!: UserRol[];
}
