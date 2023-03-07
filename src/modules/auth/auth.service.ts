import { AdminService } from "../admin/admin.service";
import { JWTService } from "./jwt.service";

export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JWTService,
  ) {}

  async validateAdminByLoginPassword(login: string, password: string) {
    const user = await this.adminService.getByLogin(login).catch(() => {
      throw new Error("Invalid login.");
    });
    const isPasswordSame = await user.isPasswordValid(password);
    if (!isPasswordSame) {
      throw new Error("Invalid password");
    }
    return user;
  }

  async validateAdminById(userId: string) {
    const user = await this.adminService.getById(userId).catch(() => {
      throw new Error("Valid token with non-existent admin.");
    });
    return user;
  }

  async validateToken(token: string, type: "access" | "refresh") {
    const sub = this.jwtService.verifyToken(token, type);
    const admin = await this.adminService.getById(sub);
    return admin;
  }

  getJWT(type: "access" | "refresh", sub: string) {
    return this.jwtService.getJwt(sub, type);
  }
}
