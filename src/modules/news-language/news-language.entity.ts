import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { News } from "../news/news.entity";

@Entity("news_language")
export class NewsLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: true })
  shortDescription: string;

  @Column({ type: "text", nullable: true, array: true })
  descImg: string[];

  @Column({ type: "varchar", nullable: true })
  shortLink: string;

  @Column({ type: "varchar", nullable: true })
  file: string;

  @Column({ type: "varchar", array: true, nullable: true })
  tags: string[];

  @OneToOne(() => News, (news) => news.uz, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  uz: News;

  @OneToOne(() => News, (news) => news.ru, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  ru: News;

  @OneToOne(() => News, (news) => news.en, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  en: News;

  @OneToOne(() => News, (news) => news.уз, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  уз: News;
}
