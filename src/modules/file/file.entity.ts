import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({ type: "text" })
  path: string;
}
