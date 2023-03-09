import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Permission } from "./permission.entity";
import { CreatPermissionDto, UpUpdatePermissionDto } from "./dto";

export class PermissionService {
  constructor(private readonly permissionRepository: Repository<Permission>) {}

  async getAll(): Promise<Permission[]> {
    const categories = await this.permissionRepository.find();
    return categories;
  }

  async getById(id: string): Promise<Permission> {
    const category = await this.permissionRepository.findOne({ where: { id } });
    return category;
  }

  async getManyPermissionsById(ids: string[]) {
    return this.permissionRepository
      .createQueryBuilder()
      .where("id IN(:...ids)", { ids })
      .getMany();
  }

  async create(values: CreatPermissionDto): Promise<Permission> {
    const response = await this.permissionRepository.create(values);
    return response;
  }

  async update(
    values: UpUpdatePermissionDto,
    id: string,
  ): Promise<UpdateResult> {
    const response = await this.permissionRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.permissionRepository.delete(id);
    return response;
  }
}
