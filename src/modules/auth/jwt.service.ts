import * as jwt from "jsonwebtoken";
import { HttpException } from "../../infra/validation";

export class JWTService {
  getJwt(sub: string, type: "access" | "refresh") {
    try {
      const payload = { sub };
      if (type === "access") {
        return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        });
      }
      return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      });
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  verifyToken(token: string, type: "access" | "refresh") {
    try {
      let decode;
      if (type == "access") {
        decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) as {
          id: string;
        };
      } else {
        decode = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as {
          id: string;
        };
      }
      const { sub } = decode;
      return sub;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }
}
