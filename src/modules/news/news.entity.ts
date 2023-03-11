import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinColumn,
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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  publishDate: Date;

  @ManyToMany(() => Category, (category) => category.news)
  categories: Category[];

  @ManyToOne(() => Admin, (admin) => admin.news)
  @JoinColumn()
  creator: Admin;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.uz, {
    onDelete: "SET NULL",
  })
  uz: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.уз, {
    onDelete: "SET NULL",
  })
  уз: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.ru, {
    onDelete: "SET NULL",
  })
  ru: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.en, {
    onDelete: "SET NULL",
  })
  en: NewsLanguage;
}
