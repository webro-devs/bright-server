import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { News } from "../news/news.entity";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  login: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  fullName: string;

  @Column({ type: "text" })
  city: string;

  @Column({ type: "text" })
  education: string;

  @Column({ default: true, type: "boolean" })
  isActive: boolean;
}
