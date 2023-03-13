import { Request } from "express";
interface Upload extends Request {
  files: any;
}

export default Upload;
