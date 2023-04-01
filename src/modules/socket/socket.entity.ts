import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("socket")
export class SocketEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  socketId: string;

  @Column({type: "text"})
  admin: string;

  @Column({type: "text",nullable:true})
  news: string;
}
