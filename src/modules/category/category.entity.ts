import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { News } from "../news/news.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  uz: string;

  @Column({ type: "text" })
  en: string;

  @Column({ type: "text" })
  ru: string;

  @Column({ type: "text" })
  уз: string;

  @ManyToMany(() => News, (news) => news.categories, {
    cascade: true,
    onDelete: "CASCADE",
  })
  news: News[];
}
