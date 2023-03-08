import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { State } from "../../infra/shared/enums";
import { Admin } from "../admin/admin.entity";
import { Category } from "../category/category.entity";
import { NewsLanguage } from "../news-language/news-language.entity";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: State })
  state: State[];

  @Column({ type: "timestamptz" })
  publishDate: Date;

  @ManyToMany(() => Category, (category) => category.news)
  categories: Category[];

  @ManyToOne(() => Admin, (admin) => admin.news)
  creator: Admin;

  @OneToOne(() => NewsLanguage, { cascade: true })
  @JoinColumn()
  uz: NewsLanguage;

  @OneToOne(() => NewsLanguage, { cascade: true })
  @JoinColumn()
  уз: NewsLanguage;

  @OneToOne(() => NewsLanguage, { cascade: true })
  @JoinColumn()
  ru: NewsLanguage;

  @OneToOne(() => NewsLanguage, { cascade: true })
  @JoinColumn()
  en: NewsLanguage;
}
