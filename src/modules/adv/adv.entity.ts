import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("adv")
export class Adv {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  imgUrl: string;

  @Column({ type: "varchar" })
  link: string;

  @Column({ type: "int" })
  viewCount: number;
}

