import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { State } from "../../infra/shared/enums";
import { Admin } from "../admin/admin.entity";
import { Category } from "../category/category.entity";
import { NewsLanguage } from "../news-language/news-language.entity";
import { Notification } from "../notification/notification.entity";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: "general access" })
  state: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  publishDate: Date;

  @ManyToMany(() => Category, (category) => category.news, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Category, (category) => category, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  mainCategory: Category;

  @ManyToOne(() => Admin, (admin) => admin.news, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  creator: Admin;

  @OneToMany(() => Notification, (notification) => notification.news)
  notifications: Notification[];

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.uz)
  uz: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.уз)
  уз: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.ru)
  ru: NewsLanguage;

  @OneToOne(() => NewsLanguage, (newsLanguage) => newsLanguage.en)
  en: NewsLanguage;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  public created_at: Date;
}
