import * as AdmZip from "adm-zip";
import { HttpException } from "../validation";

const ZipMaker = async () => {
  try {
    const zip = new AdmZip();
    await zip.addLocalFolder(__dirname + "/output/uploads");
    const response = await zip.toBuffer();
    return response;
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
};

export default ZipMaker;
