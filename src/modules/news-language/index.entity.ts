import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("news_language")
export class NewsLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;
}
