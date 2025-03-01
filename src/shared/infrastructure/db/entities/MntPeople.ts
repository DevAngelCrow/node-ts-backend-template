import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentPeople } from "./DocumentPeople";
import { MntAddress } from "./MntAddress";
import { MntInsurance } from "./MntInsurance";
import { CtlGender } from "./CtlGender";
import { CtlMaritalStatus } from "./CtlMaritalStatus";
import { CtlStatusPeople } from "./CtlStatusPeople";
import { MntUser } from "./MntUser";
import { PeopleCountry } from "./PeopleCountry";

@Index("mnt_people_pk", ["id"], { unique: true })
@Index("mnt_people_email_idx", ["email"], {unique: true})
@Entity("mnt_people", { schema: "public" })
export class MntPeople {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "first_name" })
  firstName!: string;

  @Column("character varying", { name: "middle_name", nullable: true })
  middleName?: string | null;

  @Column("character varying", { name: "last_name", nullable: true })
  lastName!: string | null;

  @Column("date", { name: "birthdate" })
  birthdate!: string;

  @Column("character varying", { name: "email" })
  email!: string;

  @Column("character varying", { name: "img_path", nullable: true })
  imgPath?: string | null;

  @Column("character varying", { name: "phone" })
  phone!: string;

  @Column("boolean", { name: "has_insurance", nullable: true })
  hasInsurance!: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @OneToMany(() => DocumentPeople, (documentPeople) => documentPeople.idPeople)
  documentPeople!: DocumentPeople[];

  @OneToMany(() => MntAddress, (mntAddress) => mntAddress.idPeople)
  mntAddresses!: MntAddress[];

  @OneToMany(() => MntInsurance, (mntInsurance) => mntInsurance.idPeople)
  mntInsurances!: MntInsurance[];

  @ManyToOne(() => CtlGender, (ctlGender) => ctlGender.mntPeople, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_gender", referencedColumnName: "id" }])
  idGender!: CtlGender;

  @ManyToOne(
    () => CtlMaritalStatus,
    (ctlMaritalStatus) => ctlMaritalStatus.mntPeople,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_marital_status", referencedColumnName: "id" }])
  idMaritalStatus!: CtlMaritalStatus;

  @ManyToOne(
    () => CtlStatusPeople,
    (ctlStatusPeople) => ctlStatusPeople.mntPeople,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_status", referencedColumnName: "id" }])
  idStatus!: CtlStatusPeople;

  @OneToMany(() => MntUser, (mntUser) => mntUser.idPeople)
  mntUsers!: MntUser[];

  @OneToMany(() => PeopleCountry, (peopleCountry) => peopleCountry.idPeople)
  peopleCountries!: PeopleCountry[];
}
