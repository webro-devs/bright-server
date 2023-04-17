import * as Jimp from "jimp";
import * as path from "path";

const size = {
  А: 16,
  Б: 12,
  В: 12,
  Г: 11,
  Д: 17,
  Е: 10,
  Ж: 20,
  З: 13,
  И: 15,
  Й: 15,
  К: 13,
  Л: 15,
  М: 17,
  Н: 14,
  О: 16,
  П: 13,
  Р: 12,
  С: 12,
  Т: 13,
  У: 14,
  Ф: 18,
  Х: 15,
  Ц: 15,
  Ч: 14,
  Ш: 20,
  Щ: 23,
  Ъ: 16,
  Ы: 18,
  Ь: 12,
  Э: 13,
  Ю: 21,
  Я: 13,
  а: 11,
  б: 12,
  в: 11,
  г: 9,
  д: 14,
  е: 12,
  ж: 18,
  з: 11,
  и: 13,
  й: 13,
  к: 12,
  л: 13,
  м: 16,
  н: 12,
  о: 13,
  п: 12,
  р: 12,
  с: 11,
  т: 12,
  у: 13,
  ф: 16,
  х: 12,
  ц: 13,
  ч: 12,
  ш: 18,
  щ: 20,
  ъ: 15,
  ы: 16,
  ь: 11,
  э: 10,
  ю: 17,
  я: 11,
  " ": 16,
};

const getTextSize = (text) => {
  const arr = text.split("");
  let textSize = arr.reduce((acc, curr) => {
    return (acc += size[curr] || 12);
  }, 0);
  return textSize + text.length;
};

const drawLine = ({
  image,
  width,
  height,
  x,
  y,
  color = [255, 255, 255, 142],
}) => {
  for (let h = 0; h < height; h++) {
    for (let i = 0; i < width; i++) {
      image.setPixelColor(Jimp.rgbaToInt(...color), x + i, y + h);
    }
  }
};

const outline = ({
  x,
  y,
  width,
  height,
  image,
  borderWidth = 1,
  color = [255, 255, 255, 255],
}) => {
  for (let w = 0; w < borderWidth; w++) {
    x = x + w;
    y = y + w;
    width = width - w + 1;
    height = height - w + 1;
    const borderRadius = height / 2;
    const iterCount = borderRadius * 11.11;
    const center = {
      x: borderRadius + x,
      y: borderRadius + y,
    };
    const radius = {
      x: borderRadius,
      y: borderRadius,
    };
    let angle_step = (2 * Math.PI) / iterCount;
    let output_points = [];

    for (let t = borderRadius; t < width - borderRadius; t++) {
      image.setPixelColor(Jimp.rgbaToInt(...color), x + t, y);
    }
    for (let b = borderRadius; b < width - borderRadius; b++) {
      image.setPixelColor(Jimp.rgbaToInt(...color), x + b, y + height);
    }

    for (let i = 0, angle = 0; i < iterCount; i++, angle += angle_step) {
      let point = {};
      if (i > iterCount / 2) {
        point = {
          x: center.x + Math.sin(angle) * radius.x,
          y: center.y + Math.cos(angle) * radius.y,
        };
      } else {
        point = {
          x: center.x + width - borderRadius * 2 + Math.sin(angle) * radius.x,
          y: center.y + Math.cos(angle) * radius.y,
        };
      }
      output_points.push(point);
    }

    output_points.map((coordinate) => {
      image.setPixelColor(Jimp.rgbaToInt(...color), coordinate.x, coordinate.y);
    });
  }
};

const textWrapper = ({
  text,
  px = 22,
  py = 12,
  image,
  font,
  left,
  top,
  startFromRight = true,
  startFromBottom = true,
}) => {
  const textSize = getTextSize(text);
  const wrapperWidth = textSize + px * 2;
  const wrapperHeight = 30 + py * 2;
  const x = startFromRight ? left - wrapperWidth : left;
  const y = startFromBottom ? top - wrapperHeight : top;

  outline({
    x,
    y,
    width: wrapperWidth,
    height: wrapperHeight,
    image,
    borderWidth: 1,
  });
  image.print(font, x + px, y + py, text);

  return {
    left: startFromRight ? left - wrapperWidth : left,
    top: startFromBottom ? top - wrapperHeight : top,
    width: wrapperWidth,
    height: wrapperHeight,
  };
};

const lines = [
  {
    width: 100,
    height: 2,
    x: 60,
    y: 156,
  },
  {
    width: 340,
    height: 2,
    x: 201,
    y: 156,
  },
  {
    width: 340,
    height: 2,
    x: 599,
    y: 156,
  },
  {
    width: 410,
    height: 2,
    x: 60,
    y: 720,
  },
  {
    width: 410,
    height: 2,
    x: 530,
    y: 720,
  },
];

const CImage = async ({ txt, ctgs = [], imgPath, imgName }) => {
  ctgs = ctgs.slice(0, 3);
  const Ddate = new Date();
  const months = [
    "January",
    "Февраль",
    "Март",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const oldStandart = await Jimp.loadFont(
      path.resolve(
        __dirname,
        "./uploads/fonts/OldStandart/White/pVr3RJw06gZ6gvNh9TSpYAZX.ttf.fnt",
      ),
    );
    const notoSans = await Jimp.loadFont(
      path.resolve(
        __dirname,
        "./uploads/fonts/Noto/White/pVr3RJw06gZ6gvNh9TSpYAZX.ttf.fnt",
      ),
    );
    const logo = await Jimp.read(path.resolve(__dirname, "./uploads/logo.png"));
    const topMask = await Jimp.read(
      path.resolve(__dirname, "./uploads/mask/top.png"),
    );
    const bottomMask = await Jimp.read(
      path.resolve(__dirname, "./uploads/mask/bottom.png"),
    );
    const url = `${imgPath}`;
    const image = await Jimp.read(url);
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;

    if (imageWidth > imageHeight) {
      const diff = (imageWidth - imageHeight) / 2;
      await image.crop(diff, 0, imageHeight, imageHeight);
    } else {
      const diff = (imageHeight - imageWidth) / 2;
      await image.crop(0, diff, imageWidth, imageWidth);
    }

    await image
      .resize(1000, 1000)
      .composite(topMask, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
      })
      .composite(bottomMask, 0, 544, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
      })
      .composite(logo, 60, 61, { mode: Jimp.BLEND_SOURCE_OVER, opacityDest: 1 })
      .print(oldStandart, 60, 742, txt, 800, 250);

    lines.forEach((line) => drawLine({ image, ...line }));
    const year = textWrapper({
      image,
      font: notoSans,
      left: 940,
      top: 128,
      text: "2023",
    });
    const date = textWrapper({
      image,
      font: notoSans,
      left: year.left - 10,
      top: 128,
      text: `${Ddate.getDate()} ${months[Ddate.getMonth()]}`,
    });

    let nextCtgPositionX = 60;

    ctgs?.length > 0 &&
      ctgs.forEach((ctg) => {
        const { left, width } = textWrapper({
          image,
          font: notoSans,
          left: nextCtgPositionX,
          top: 690,
          text: ctg,
          startFromRight: false,
        });
        nextCtgPositionX = left + width + 10;
      });

    await image.normalize();
    await image.writeAsync(path.resolve(__dirname, `./output/${imgName}`));
  } catch (error) {
    console.log(error);
  }
};

const CImage3 = async ({ imgPath, imgName }) => {
  try {
    const logo = await Jimp.read(path.resolve(__dirname, "./uploads/logo.png"));
    const topMask = await Jimp.read(
      path.resolve(__dirname, "./uploads/mask/top.png"),
    );
    const url = `${imgPath}`;
    const image = await Jimp.read(url);
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;

    if (imageWidth > imageHeight) {
      const diff = (imageWidth - imageHeight) / 2;
      await image.crop(diff, 0, imageHeight, imageHeight);
    } else {
      const diff = (imageHeight - imageWidth) / 2;
      await image.crop(0, diff, imageWidth, imageWidth);
    }

    await image
      .resize(1000, 1000)
      .composite(topMask, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
      })
      .composite(logo, 60, 61, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
      });

    await image.normalize();
    await image.writeAsync(path.resolve(__dirname, `./output/${imgName}`));
  } catch (error) {
    console.log(error);
  }
};

const Image2 = async ({ txt, ctg = "", imgPath, imgName }) => {
  try {
    const Merreweat = await Jimp.loadFont(
      path.resolve(__dirname, "./uploads/fonts/Merriweat/black.fnt"),
    );
    const notoSans = await Jimp.loadFont(
      path.resolve(
        __dirname,
        "./uploads/fonts/Noto/White/pVr3RJw06gZ6gvNh9TSpYAZX.ttf.fnt",
      ),
    );
    const logo = await Jimp.read(
      path.resolve(__dirname, "./uploads/mask/black_logo.png"),
    );
    const cropImage = await Jimp.read(imgPath);

    const imageWidth = cropImage.bitmap.width;
    const imageHeight = cropImage.bitmap.height;
    const textSize = getTextSize(ctg);
    const ctgWrapperWidth = textSize + 70;

    if (imageWidth > imageHeight) {
      const diff = (imageWidth - (imageHeight / 13) * 20) / 2;
      await cropImage.crop(
        diff,
        0,
        imageWidth - (imageHeight / 13) * 20,
        imageHeight,
      );
    } else {
      const diff = (imageHeight - (imageWidth / 20) * 13) / 2;
      await cropImage.crop(
        0,
        diff,
        imageWidth,
        imageHeight - (imageWidth / 20) * 13,
      );
    }

    cropImage.scaleToFit(700, 700);

    const image = await Jimp.read(1000, 1000, "#fff");
    await image.composite(cropImage, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
    });

    drawLine({
      image,
      x: 0,
      y: 650,
      width: 1000,
      height: 350,
      color: [238, 238, 238, 255],
    });
    drawLine({
      image,
      x: 0,
      y: 623,
      width: ctgWrapperWidth,
      height: 53,
      color: [220, 84, 67, 255],
    });

    await image.print(Merreweat, 76, 705, txt, 804, 216);
    await image.print(notoSans, 33, 635, ctg).composite(logo, 850, 916, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
    });

    await image.writeAsync(path.resolve(__dirname, `./output/${imgName}`));
  } catch (error) {
    console.log(error);
  }
};

export default { CImage, CImage3, Image2 };
