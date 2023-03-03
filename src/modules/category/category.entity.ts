import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;
}
