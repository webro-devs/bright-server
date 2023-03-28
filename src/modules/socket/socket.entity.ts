import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Admin } from "../admin/admin.entity";

@Entity("socket")
export class SocketEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  socketId: string;

  @OneToOne(() => Admin, (admin) => admin.socket, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  admin: Admin;
}
