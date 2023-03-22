import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Notification } from "./notification.entity";
import { CreateNotificationDto, InsertNotificationDto } from "./dto";
import { HttpException } from "../../infra/validation";

export class NotificationService {
  constructor(
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getAll(): Promise<Notification[]> {
    try {
      const notifications = await this.notificationRepository.find({
        where: {
          state: "pending",
        },
        relations: {
          news: {
            uz: true,
            ru: true,
            en: true,
            уз: true,
            creator: true,
            categories: true,
            mainCategory: true,
          },
          from: true,
        },
      });
      return notifications;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Notification> {
    try {
      const category = await this.notificationRepository.findOne({
        where: { id },
      });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getMyNotifications(id: string) {
    try {
      const data = await this.notificationRepository.find({
        where: {
          from: { id },
        },
        relations: {
          news: {
            uz: true,
            ru: true,
            en: true,
            уз: true,
            creator: true,
            categories: true,
            mainCategory: true,
          },
          from: true,
        },
      });
      return data;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateNotificationDto, from: string) {
    try {
      const notifications: InsertNotificationDto[] = [];
      for (let i = 0; i < values.newsIds.length; i++) {
        notifications.push({
          news: values.newsIds[i],
          from,
        });
      }
      const response = await this.notificationRepository
        .createQueryBuilder()
        .insert()
        .into(Notification)
        .values(notifications as unknown as Notification)
        .execute();
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async updateIsViewed(ids: string[]) {
    try {
      const response = await this.notificationRepository
        .createQueryBuilder()
        .update()
        .set({ isViewed: true })
        .where("id IN(:...ids)", { ids })
        .execute();
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async updateState(ids: string[], state: string) {
    try {
      const response = await this.notificationRepository
        .createQueryBuilder()
        .update()
        .set({ state })
        .where("id IN(:...ids)", { ids })
        .execute();
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.notificationRepository.delete(id);
      return new HttpException(false, 204, "Notification removed!");
    } catch (error) {
      return new HttpException(true, 500, error.message);
    }
  }

  async removeMoreByIds(ids: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.notificationRepository
        .createQueryBuilder()
        .delete()
        .where("id IN(:...ids)", { ids })
        .execute();
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }
}
