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
  UpdateDateColumn,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { Category } from "../category/category.entity";
import { NewsEditor } from "../editors/editors.entity";
import { NewsLanguage } from "../news-language/news-language.entity";
import { Notification } from "../notification/notification.entity";
import { Chat } from "../chat/chat.entity";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: "general access" })
  state: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  publishDate: Date;

  @Column({ default: false, type: "boolean" })
  isEditing: boolean;

  @Column({ type: "varchar", nullable: true })
  file: string;

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

  @OneToMany(() => NewsEditor, (newsEditor) => newsEditor.news)
  editors: NewsEditor[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToOne(() => Chat, (chat) => chat.news)
  chat: Chat;
}
