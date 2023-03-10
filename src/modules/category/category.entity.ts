import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { News } from "../news/news.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "varchar" })
  key: string;

  @ManyToMany(() => News, (news) => news.categories)
  news: News[];
}
