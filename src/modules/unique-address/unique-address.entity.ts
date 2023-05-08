import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Advertisement } from "../adv/adv.entity";

@Entity("unique_address")
export class UniqueAddress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  ipAddress: string;

  @Column({ type: "int", default: 0 })
  topCount: number;

  @Column({ type: "int", default: 0 })
  midCount: number;

  @Column({ type: "int", default: 0 })
  vipCount: number;

  @Column({ type: "int", default: 0 })
  sideCount: number;

  @Column({ type: "int", default: 0 })
  singleCount: number;

  @ManyToMany(
    () => Advertisement,
    (advertisement) => advertisement.uniqueAddresses,
    {
      cascade: true,
      onDelete: "CASCADE",
    },
  )
  advertisements: Advertisement[];
}
