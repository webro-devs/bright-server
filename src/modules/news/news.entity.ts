import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { State } from "../../infra/shared/enums";
import { Admin } from "../admin/admin.entity";
import { Category } from "../category/category.entity";
import { NewsLanguage } from "../news-language/news-language.entity";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: "general access" })
  state: State;

  @Column({ type: "timestamp", nullable: true })
  publishDate: string;

  @ManyToMany(() => Category, (category) => category.news)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Admin, (admin) => admin.news, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  creator: Admin;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.uz)
  uz: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.уз)
  уз: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.ru)
  ru: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.en)
  en: NewsLanguage;
}
