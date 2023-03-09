import {
  UpdateResult,
  DeleteResult,
  Repository,
  DataSource,
  EntityManager,
} from "typeorm";
import { hashPassword } from "../../infra/helpers";
import { PermissionService } from "../permission/permission.service";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto, UpdateAdminProfileDto } from "./dto";

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
    let password,
      permissions,
      admin = await this.getById(id);
    permissions = admin.permissions;
    password = admin.password;

    if (values.permissions) {
      permissions = await this.permissionService.getManyPermissionsById(
        values.permissions,
      );
    }
    if (values.password) {
      password = hashPassword(values.password);
    }
    const response = await this.adminRepository.update(id, {
      ...values,
      password,
      permissions,
    });
    return response;
  }

  async changeActive(id: string, isActive: boolean) {
    const response = await this.adminRepository.update(id, { isActive });
    return response;
  }

  async changeProfile(id: string, values: UpdateAdminProfileDto) {
    let password,
      admin = await this.getById(id);
    password = admin.password;
    if (values.password) {
      password = hashPassword(values.password);
    }
    const response = await this.adminRepository.update(id, {
      ...values,
      password,
    });
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.adminRepository.delete(id);
    return response;
  }
}
