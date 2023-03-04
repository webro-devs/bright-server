import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("newsLanguage")
export class newsLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;
}
