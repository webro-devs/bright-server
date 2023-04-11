import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";

import { ProjectLanguage } from "../project-language/project-language.entity";

@Entity("about_project")
export class AboutProject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  image: string;

  @Column({ type: "varchar", array: true, nullable: false })
  links: string[];

  @OneToOne(() => ProjectLanguage, (projectLanguage) => projectLanguage.uz, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  uz: AboutProject;

  @OneToOne(() => ProjectLanguage, (projectLanguage) => projectLanguage.ru, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  ru: AboutProject;

  @OneToOne(() => ProjectLanguage, (projectLanguage) => projectLanguage.en, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  en: AboutProject;

  @OneToOne(() => ProjectLanguage, (projectLanguage) => projectLanguage.уз, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  уз: AboutProject;
}
