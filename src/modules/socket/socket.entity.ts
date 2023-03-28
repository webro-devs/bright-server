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

  @Column({type: "text"})
  admin: string;
}
