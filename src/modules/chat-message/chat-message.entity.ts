import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { Chat } from "../chat/chat.entity";

@Entity("chat_message")
export class chatMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Admin, (admin) => admin.id, { onDelete: "SET NULL" })
  @JoinColumn()
  user: Admin;

  @Column({ type: "varchar" })
  date: string;

  @Column({ type: "varchar" })
  body: string;

  @ManyToOne(() => Chat, (chat) => chat.id, { onDelete: "CASCADE" })
  @JoinColumn()
  chat: Chat;
}
