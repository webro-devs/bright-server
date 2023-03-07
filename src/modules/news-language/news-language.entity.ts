import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { NewsLanguageEnum } from "../../infra/shared/enums";

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

  @Column("url")
  shortLink: string;

  @Column("url")
  img: string;

  @Column({ type: "array" })
  tags: string[];
}
