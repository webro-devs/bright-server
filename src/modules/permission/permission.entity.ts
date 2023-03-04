import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("permission")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;
}
