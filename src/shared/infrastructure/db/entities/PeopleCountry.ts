import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CtlCountry } from "./CtlCountry";
import { MntPeople } from "./MntPeople";

@Index("people_country_pk", ["id"], { unique: true })
@Entity("people_country", { schema: "public" })
export class PeopleCountry {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date;

  @Column("timestamp without time zone", { name: "update_at", nullable: true })
  updateAt?: Date | null;

  @Column("boolean", { name: "state", default: () => "true" })
  state?: boolean;

  @ManyToOne(() => CtlCountry, (ctlCountry) => ctlCountry.peopleCountries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_country", referencedColumnName: "id" }])
  idCountry!: CtlCountry;

  @ManyToOne(() => MntPeople, (mntPeople) => mntPeople.peopleCountries, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_people", referencedColumnName: "id" }])
  idPeople!: MntPeople;
}
