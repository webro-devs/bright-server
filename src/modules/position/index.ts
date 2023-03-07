import { TypeOrmDataSource } from "../../config";

import { PositionService } from "./position.service";
import { Position } from "./position.entity";

export const repository = TypeOrmDataSource.getRepository(Position);

export const positionService = new PositionService(repository);
