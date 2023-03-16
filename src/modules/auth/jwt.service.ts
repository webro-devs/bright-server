import * as jwt from "jsonwebtoken";

export class JWTService {
  getJwt(sub: string, type: "access" | "refresh") {
    const payload = { sub };    
    if (type === "access") {
      return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      });
    }
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }

  verifyToken(token: string, type: "access" | "refresh") {  

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
  }
}
