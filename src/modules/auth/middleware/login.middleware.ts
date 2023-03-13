import { NextFunction, Response } from "express";
import { HttpException } from "../../../infra/validation";
import { authService } from "../auth.module";
import { LoginDto } from "../dto";

const LoginMiddleware = async (req, res: Response, next: NextFunction) => {
  try {
    const data: LoginDto = req.body;
    const user = await authService.validateAdminByLoginPassword(
      data.login,
      data.password,
    );
    req.user = user;
    next();
  } catch (err) {
    res.send(new HttpException(true, 400, err.message));
  }
};

export default LoginMiddleware;
