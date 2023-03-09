import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { News } from "../news/news.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "varchar" })
  key: string;

  @ManyToMany(() => News, (news) => news.categories)
  news: News[];
}

[
  {
    id: 1,
    title: "Yangiliklar",
    key: "uz",
  },
  {
    id: 2,
    title: "Новости",
    key: "ru",
  },
  {
    id: 3,
    title: "News",
    key: "en",
  },
  {
    id: 4,
    title: "Янгиликлар",
    key: "уз",
  },
  {
    id: 5,
    title: "Politika",
    key: "uz",
  },
  {
    id: 6,
    title: "Политика",
    key: "ru",
  },
  {
    id: 7,
    title: "Politics",
    key: "en",
  },
  {
    id: 8,
    title: "Политика",
    key: "уз",
  },
];
