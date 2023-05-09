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

@Entity("advertisement")
export class Advertisement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar" })
  imgUrl: string;

  @Column({ type: "varchar" })
  link: string;

  @Column({ type: "int", default: 0 })
  viewTotalCount: number;

  @Column({ type: "int", default: 0 })
  viewUniqueCount: number;

  @Column({ type: "boolean", default: false })
  isActive: boolean = false;

  @Column({ type: "varchar" })
  type: AdvertisementEnum;

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
