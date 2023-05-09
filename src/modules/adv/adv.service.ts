import {
  UpdateResult,
  DeleteResult,
  Repository,
  DataSource,
  EntityManager,
} from "typeorm";
import { Advertisement } from "./adv.entity";
import {
  CreateAdvertisementDto,
  GetAdvertisementDto,
  UpdateAdvertisementDto,
} from "./dto";
import { HttpException } from "../../infra/validation";
import { AdvertisementEnum } from "../../infra/shared/enums";
import { UniqueAddressService } from "../unique-address/unique-address.service";

export class AdvertisementService {
  constructor(
    private readonly advertisementRepository: Repository<Advertisement>,
    private readonly uniqueAddressService: UniqueAddressService,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<Advertisement[]> {
    try {
      const data = await this.advertisementRepository.find({order: {date: 'DESC'}});
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Advertisement> {
    try {
      const data = await this.advertisementRepository.findOne({
        where: { id },
        relations: {
          creator: true,
        },
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByType(type: AdvertisementEnum, ip: string) {
    try {
      let index, uniqueIp;
      const [data, count] = await this.advertisementRepository.findAndCount({
        where: { type, isActive: true },
        order: { date: "ASC" },
        relations: {
          uniqueAddresses: true,
        },
      });

      if (data.length > 0) {
        if (type == AdvertisementEnum.top) {
          const value = await this.getByTypeTop(ip, count);
          index = value.index;
          uniqueIp = value.uniqueIp;
        } else if (type == AdvertisementEnum.aside) {
          const value = await this.getByTypeAside(ip, count);
          index = value.index;
          uniqueIp = value.uniqueIp;
        } else if (type == AdvertisementEnum.mid) {
          const value = await this.getByTypeMid(ip, count);
          index = value.index;
          uniqueIp = value.uniqueIp;
        } else if (type == AdvertisementEnum.midSingle) {
          const value = await this.getByTypeSingle(ip, count);
          index = value.index;
          uniqueIp = value.uniqueIp;
        } else if (type == AdvertisementEnum.vip) {
          const value = await this.getByTypeVip(ip, count);
          index = value.index;
          uniqueIp = value.uniqueIp;
        }
        const isExist = data[index].uniqueAddresses.find(
          (f) => f.id == uniqueIp.id,
        );
        if (!isExist) {
          data[index].uniqueAddresses.push(uniqueIp);
        }
        data[index].viewTotalCount += 1;
        data[index].viewUniqueCount = data[index].uniqueAddresses.length;
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(data[index]);
        });
        return data[index];
      } else {
        return [];
      }
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByTypeTop(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: "topCount",
        count,
      });
    return { uniqueIp: data, index };
  }
  async getByTypeMid(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: "midCount",
        count,
      });
    return { uniqueIp: data, index };
  }
  async getByTypeAside(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: "sideCount",
        count,
      });
    return { uniqueIp: data, index };
  }
  async getByTypeSingle(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: "singleCount",
        count,
      });
    return { uniqueIp: data, index };
  }
  async getByTypeVip(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: "vipCount",
        count,
      });
    return { uniqueIp: data, index };
  }

  async create(values: CreateAdvertisementDto) {
    try {
      const response = this.advertisementRepository
        .createQueryBuilder()
        .insert()
        .into(Advertisement)
        .values(values as unknown as Advertisement)
        .execute();
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateIsActive(id: string, isActive: boolean) {
    try {
      const response = await this.advertisementRepository.update(id, {
        isActive,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateIsClickCount(id: string) {
    try {
      const data = await this.advertisementRepository.findOne({where:{id}})
      data.clickCount += 1
      await this.connection.transaction(async(manger)=>{
         await manger.save(data)
      })
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(
    values: UpdateAdvertisementDto,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const response = await this.advertisementRepository
        .createQueryBuilder()
        .update()
        .set(values as unknown as Advertisement)
        .where("id = :id", { id })
        .execute();
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.advertisementRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
