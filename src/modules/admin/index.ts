import { TypeOrmDataSource } from "../../config";

import { AdminService } from "./admin.service";
import { Admin } from "./admin.entity";

export const repository = TypeOrmDataSource.getRepository(Admin);

export const adminService = new AdminService(repository);
