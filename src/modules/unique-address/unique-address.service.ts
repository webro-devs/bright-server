import {
  UpdateResult,
  DeleteResult,
  Repository,
  DataSource,
  EntityManager,
} from "typeorm";
import { UniqueAddress } from "./unique-address.entity";
import { CreateUniqueAddressDto } from "./dto";
import { HttpException } from "../../infra/validation";
import { AdvertisementEnum } from "../../infra/shared/enums";
import { GetAdvertisementDto } from "../adv/dto";

export class UniqueAddressService {
  constructor(
    private readonly uniqueAddressRepository: Repository<UniqueAddress>,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<UniqueAddress[]> {
    try {
      const data = await this.uniqueAddressRepository.find();
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<UniqueAddress> {
    try {
      const data = await this.uniqueAddressRepository.findOne({
        where: { id },
        relations: {
          advertisements: true,
        },
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByIp(ipAddress: string): Promise<UniqueAddress> {
    try {
      const data = await this.uniqueAddressRepository.findOne({
        where: { ipAddress },
        relations: {
          advertisements: true,
        },
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateUniqueAddressDto) {
    try {
      const response = this.uniqueAddressRepository.create(values);
      return await this.uniqueAddressRepository.save(response);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.uniqueAddressRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async WorkingWithIpAddress(
    value: GetAdvertisementDto & {
      count: number;
    },
  ) {
    try {
      const data = await this.uniqueAddressRepository.findOne({
        where: { ipAddress: value.ipAddress },
      });
      if (!data) {
        const response = await this.create({
          ipAddress: value.ipAddress,
        });
        response[value.type] = 1;
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(response).catch((err) => new Error(err));
        });
        return { data: response, index: 0 };
      } else {
        let index = data[value.type] < value.count ? data[value.type] : 0;
        if (data[value.type] < value.count) {
          data[value.type] += 1;
        } else {
          data[value.type] = 1;
        }
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(data).catch((err) => new Error(err));
        });
        return { data, index };
      }
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
