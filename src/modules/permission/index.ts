import { TypeOrmDataSource } from "../../config";

import { PermissionService } from "./permission.service";
import { Permission } from "./permission.entity";

export const repository = TypeOrmDataSource.getRepository(Permission);

export const permissionService = new PermissionService(repository);
