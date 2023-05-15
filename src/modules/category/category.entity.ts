import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { News } from "../news/news.entity";
import { Advertisement } from "../adv/adv.entity";

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

  @Column({ type: "text", nullable: true })
  uzSlag: string;

  @Column({ type: "text", nullable: true })
  enSlag: string;

  @Column({ type: "text", nullable: true })
  ruSlag: string;

  @Column({ type: "text", nullable: true })
  узSlag: string;

  @ManyToMany(() => News, (news) => news.categories, {
    cascade: true,
    onDelete: "CASCADE",
  })
  news: News[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.category)
  advertisements: Advertisement[];
}
