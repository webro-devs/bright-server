import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { PermissionService } from "../permission/permission.service";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto";

export class AdminService {
  constructor(
    private readonly adminRepository: Repository<Admin>,
    private readonly permissionService: PermissionService,
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

  async create(values: CreateAdminDto): Promise<Admin> {
    const permissions = await this.permissionService.getManyPermissionsById(
      values.permissions,
    );
    const response = this.adminRepository.create({ ...values, permissions });
    return await this.adminRepository.save(response);
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
