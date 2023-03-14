import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Admin } from "../admin/admin.entity";

@Entity("position")
export class Position {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @OneToMany(() => Admin, (admin) => admin.position)
  admins: Admin[];
}
