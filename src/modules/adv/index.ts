import { TypeOrmDataSource } from "../../config";

import { AdvertisementService } from "./adv.service";
import { Advertisement } from "./adv.entity";
import { uniqueAddressService } from "../unique-address";

export const repository = TypeOrmDataSource.getRepository(Advertisement);

export const advertisementService = new AdvertisementService(
  repository,
  uniqueAddressService,
  TypeOrmDataSource,
);
