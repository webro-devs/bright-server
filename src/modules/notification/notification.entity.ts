import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { News } from "../news/news.entity";
import { Position } from "../position/position.entity";

@Entity("notification")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  isViewed: boolean = false;

  @Column({ type: "text", default: "pending" })
  state: string;

  @ManyToOne(() => News, (news) => news.notifications, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  news: News;

  @ManyToOne(() => Admin, (admin) => admin.notifications, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  from: Admin;
}
