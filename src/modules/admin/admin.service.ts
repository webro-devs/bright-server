import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto";

export class AdminService {
  constructor(private readonly adminRepository: Repository<Admin>) {}

  async getAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.find();
    return admins;
  }

  async getById(id: string): Promise<Admin> {
    const category = await this.adminRepository.findOne({ where: { id } });
    return category;
  }

  async create(values: CreateAdminDto): Promise<Admin> {
    const response = await this.adminRepository.create(values);
    return response;
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
