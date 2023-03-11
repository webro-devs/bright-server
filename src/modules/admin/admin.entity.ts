import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Permission } from "../permission/permission.entity";
import { News } from "../news/news.entity";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  login: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  fullName: string;

  @Column({ type: "text" })
  city: string;

  @Column({ type: "text" })
  education: string;

  @Column({ type: "text" })
  avatar: string;

  @Column({ default: true, type: "boolean" })
  isActive: boolean;

  @ManyToMany(() => Permission, (permission) => permission.admins, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => News, (news) => news.creator)
  news: News[];

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
