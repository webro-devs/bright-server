import { TypeOrmDataSource } from "../../config";

import { AdminService } from "./admin.service";
import { Admin } from "./admin.entity";
import { permissionService } from "../permission";

export const repository = TypeOrmDataSource.getRepository(Admin);

export const adminService = new AdminService(
  repository,
  permissionService,
  TypeOrmDataSource,
);
