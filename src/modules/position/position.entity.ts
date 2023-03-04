import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("positions")
export class Position {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;
}
