import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { News } from "../news/news.entity";

@Entity("editor")
export class NewsLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Admin)
  editors: Admin;

  @OneToOne(() => News)
  news: News;

  lastEditDate;
}
