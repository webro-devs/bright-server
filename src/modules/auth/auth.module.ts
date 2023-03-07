import { JWTService } from "./jwt.service";
import { AuthService } from "./auth.service";
import { adminService } from "../admin";

const jwtService = new JWTService();

export const authService = new AuthService(adminService, jwtService);
