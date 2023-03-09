import {
  UpdateResult,
  DeleteResult,
  Repository,
  DataSource,
  EntityManager,
} from "typeorm";
import { PermissionService } from "../permission/permission.service";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto";

export class AdminService {
  constructor(
    private readonly adminRepository: Repository<Admin>,
    private readonly permissionService: PermissionService,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.find();
    return admins;
  }

  async getById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: {
        permissions: true,
      },
      where: { id },
    });
    return admin;
  }

  async getByLogin(login: string) {
    const admin = await this.adminRepository.findOne({ where: { login } });
    return admin;
  }

  async create(values: CreateAdminDto) {
    const permissions = await this.permissionService.getManyPermissionsById(
      values.permissions,
    );
    const admin = new Admin();
    admin.fullName = values.fullName;
    admin.education = values.education;
    admin.city = values.city;
    admin.login = values.login;
    admin.phone = values.phone;
    admin.permissions = permissions;
    await admin.hashPassword(values.password);
    this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(admin);
    });
    return admin;
  }

  async update(values: UpdateAdminDto, id: string): Promise<UpdateResult> {
    const response = await this.adminRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.adminRepository.delete(id);
    return response;
  }
}
