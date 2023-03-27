import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { News } from "../news/news.entity";

@Entity("news_editor")
export class NewsEditor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Admin, (admin) => admin.editors, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  editor: Admin;

  @ManyToOne(() => News, (news) => news.editors, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  news: News;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  editedDate: Date;
}
