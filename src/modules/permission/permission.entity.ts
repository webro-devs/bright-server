import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Admin } from "../admin/admin.entity";

@Entity("permission")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @ManyToMany(() => Admin, (admin) => admin.permissions, {
    cascade: true,
    onDelete: "CASCADE",
  })
  admins: Admin[];
}
