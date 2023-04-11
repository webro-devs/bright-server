import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";

import { AboutProject } from "../about-project/about-project.entity";

@Entity("about_project")
export class ProjectLanguage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", array: true, nullable: false })
  description: string;

  @OneToOne(() => AboutProject, (project) => project.uz, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  uz: AboutProject;

  @OneToOne(() => AboutProject, (project) => project.ru, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  ru: AboutProject;

  @OneToOne(() => AboutProject, (project) => project.en, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  en: AboutProject;

  @OneToOne(() => AboutProject, (project) => project.уз, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  уз: AboutProject;
}
