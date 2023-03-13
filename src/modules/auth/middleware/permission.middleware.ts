import { NextFunction, Response } from "express";
import { PermissionType } from "../../../infra/shared/type";
import { HttpException } from "../../../infra/validation";
import { adminService } from "../../admin";

const PermissionMiddleware = (...permissions: PermissionType[]) => {
  return async (req, res: Response, next: NextFunction) => {
    try {
      let isPermitted = false;
      let notPermitted = "";
      const user = await adminService.getById(req.user.id);
      const adminPermission = user.permissions || [];
      for (let i = 0; i < permissions.length; i++) {
        if (adminPermission.find((ap) => ap.title == permissions[i])) {
          isPermitted = true;
        } else {
          isPermitted = false;
          notPermitted = permissions[i];
          break;
        }
      }
      if (isPermitted) {
        next();
        return;
      } else {
        res
          .sendStatus(403)
          .send(`You don't have permission for ` + notPermitted);
      }
    } catch (err) {
      res.send(new HttpException(true, 400, err.message));
    }
  };
};

export default PermissionMiddleware;
