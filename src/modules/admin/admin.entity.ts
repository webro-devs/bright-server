import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";

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

  @Column({ default: true, type: "boolean" })
  isActive: boolean;

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
