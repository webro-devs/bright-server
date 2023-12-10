import * as fs from "fs";
import { images } from "..";
import { HttpException } from "../../validation";
const { MainImage, ImageWithLogo } = images;

const mkdir = async (dir) => {
  return await fs.mkdirSync(dir, { recursive: true });
};

const SocialMediaService = async (
  news,
  newsDirName,
  key,
  isMain,
  instagramImage?,
) => {
  try {
    if (
      !fs.existsSync(__dirname + `/../output/uploads/${newsDirName}/${key}`)
    ) {
      await mkdir(__dirname + `/../output/uploads/${newsDirName}/${key}/`);
    }
    if (isMain) {
      await MainImage({
        imgPath: news?.imageForGenerate || news.file,
        imgName: `uploads/${newsDirName}/${key}/` + news.file.split("/").at(-1),
        txt: news[key]?.title,
        ctg: news?.mainCategory?.[key] || "",
      });
      return `${newsDirName}/${key}/` + news.file.split("/").at(-1);
    } else {
      await ImageWithLogo({
        imgName:
          `uploads/${newsDirName}/${key}/` + instagramImage.split("/").at(-1),
        imgPath: instagramImage,
      });
      return "";
    }
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
};

export default SocialMediaService;
