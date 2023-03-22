import { TypeOrmDataSource } from "../../config";

import { NotificationService } from "./notification.service";
import { Notification } from "./notification.entity";

export const repository = TypeOrmDataSource.getRepository(Notification);

export const notificationService = new NotificationService(repository);
