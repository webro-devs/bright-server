import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { AdvertisementEnum } from "../../infra/shared/enums";
import { Admin } from "../admin/admin.entity";
import { UniqueAddress } from "../unique-address/unique-address.entity";
import { Category } from "../category/category.entity";

@Entity("advertisement")
export class Advertisement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar" })
  imgUrl: string;

  @Column({ type: "varchar" })
  imgMobileUrl: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  link: string;

  @Column({ type: "int", default: 0 })
  viewTotalCount: number;

  @Column({ type: "int", default: 0 })
  viewUniqueCount: number;

  @Column({ type: "int", default: 0 })
  clickCount: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean = true;

  @Column({ type: "varchar" })
  type: AdvertisementEnum;

  @ManyToOne(() => Category, (category) => category.advertisements)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Admin, (admin) => admin.advertisements)
  @JoinColumn()
  creator: Admin;

  @ManyToMany(
    () => UniqueAddress,
    (uniqueAddress) => uniqueAddress.advertisements,
    {
      onDelete: "CASCADE",
    },
  )
  @JoinTable()
  uniqueAddresses: UniqueAddress[];
}
