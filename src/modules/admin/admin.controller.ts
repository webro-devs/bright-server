import { Response, Request } from "express";

import { CreateAdminDto, UpdateAdminDto, UpdateAdminProfileDto } from "./dto";
import { adminService } from ".";
import { fileService } from "../../infra/helpers";
import { Upload } from "../../infra/shared/interface";
import { HttpException } from "../../infra/validation";

export async function getMe(req: Request, res: Response) {
  try {
    const categories = await adminService.getById(req["user"].id);
    res.send(categories);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getAll(req: Request, res: Response) {
  const categories = await adminService.getAll();
  res.send(categories);
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await adminService.getById(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Upload, res: Response) {
  try {
    const createData: CreateAdminDto = req.body;
    let avatar = { url: null, error: null };

    if (req?.files?.avatar) {
      avatar = await fileService.uploadImage(req.files.avatar);
      if (avatar.error) {
        res
          .status(500)
          .send(new HttpException(true, 500, "Image upload error"));
        return;
      }
    }

    const response = await adminService.create({
      ...createData,
      avatar: avatar.url,
    });
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await adminService.remove(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Upload, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdateAdminDto = req.body;
    let avatar = { url: null, error: null };
    if (req?.files?.avatar) {
      avatar = await fileService.uploadImage(req.files.avatar);
      if (avatar.error) {
        res.send(new HttpException(true, 500, "Image upload error"));
        return;
      }
    }
    const response = await adminService.update(
      { ...updateData, avatar: avatar.url },
      id,
    );
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function changeActive(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const response = await adminService.changeActive(id, isActive);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function changeProfile(req: Upload, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdateAdminProfileDto = req.body;
    let avatar = { url: null, error: null };
    if (req?.files?.avatar) {
      avatar = await fileService.uploadImage(req.files.avatar);
      if (avatar.error) {
        res.send(new HttpException(true, 500, "Image upload error"));
        return;
      }
    }
    const response = await adminService.changeProfile(id, {
      ...updateData,
      avatar: avatar.url,
    });
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}
