import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { NewsLanguageEnum } from "../../infra/shared/enums";
import { News } from "../news/news.entity";

@Entity("news_language")
export class NewsLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar" })
  shortDescription: string;

  @Column({ type: "enum", enum: NewsLanguageEnum })
  languageKey: NewsLanguageEnum;

  @Column({ type: "varchar" })
  shortLink: string;

  @Column({ type: "varchar" })
  file: string;

  @Column({ type: "varchar" })
  tags: string[];
}
