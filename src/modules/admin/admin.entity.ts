import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Permission } from "../permission/permission.entity";
import { News } from "../news/news.entity";
import { Position } from "../position/position.entity";
import { chatMessage } from "../chat-message/chat-message.entity";
import { Notification } from "../notification/notification.entity";
import { NewsEditor } from "../editors/editors.entity";
import { Advertisement } from "../adv/adv.entity";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  login: string;

  @Column({ type: "text", select: false })
  password: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  fullName: string;

  @Column({ type: "text" })
  city: string;

  @Column({ type: "text" })
  education: string;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @Column({ default: true, type: "boolean" })
  isActive: boolean;

  @Column({ type: "timestamp with time zone", nullable: true })
  lastSeen: Date;

  @Column({ default: false, type: "boolean" })
  isOnline: boolean = false;

  @ManyToMany(() => Permission, (permission) => permission.admins, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => News, (news) => news.creator)
  news: News[];

  @ManyToOne(() => Position, (position) => position.admins, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  position: Position;

  @OneToMany(() => chatMessage, (message) => message.user)
  messages: chatMessage[];

  @OneToMany(() => Notification, (notification) => notification.from)
  notifications: Notification[];

  @OneToMany(() => NewsEditor, (newsEditor) => newsEditor.editor)
  editors: NewsEditor[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.creator)
  advertisements: Advertisement[];

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
