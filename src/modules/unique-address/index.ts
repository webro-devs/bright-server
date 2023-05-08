import { TypeOrmDataSource } from "../../config";

import { UniqueAddressService } from "./unique-address.service";
import { UniqueAddress } from "./unique-address.entity";

export const repository = TypeOrmDataSource.getRepository(UniqueAddress);

export const uniqueAddressService = new UniqueAddressService(
  repository,
  TypeOrmDataSource,
);
