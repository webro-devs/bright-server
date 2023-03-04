import { TypeOrmDataSource } from "../../config";

import { FileService } from "./file.service";
import { File } from "./file.entity";

export const repository = TypeOrmDataSource.getRepository(File);

export const permissionService = new FileService(repository);
