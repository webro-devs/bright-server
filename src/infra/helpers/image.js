import * as Jimp from "jimp";
import * as fs from 'fs'
import * as path from "path";
import { registerFont, loadImage, createCanvas } from 'canvas'

registerFont(path.join(__dirname, './uploads/fonts/Merriweat/Merriweather-Regular.ttf'), { family: 'MerriweatherRegular', weight: 400 })
registerFont(path.resolve(__dirname, './uploads/fonts/Noto/NotoSans-Bold.ttf'), { family: 'NotoSansBold', weight: 700 })
registerFont(path.resolve(__dirname, './uploads/fonts/Times/Times-Bold.ttf'), { family: 'TimesBold', weight: 700 })
registerFont(path.resolve(__dirname, './uploads/fonts/GIloy/Giloy.ttf'), { family: 'GiloyExtraBold', weight: 800 })
registerFont(path.resolve(__dirname, './uploads/fonts/Mont/Mont-Bold.ttf'), { family: 'MontBold', weight: 700 })

function wrapText({
  ctx,
  text,
  x,
  y,
  maxWidth,
  maxHeight,
  fontFamily,
  fontSize,
  lineHeight,
}) {
  let font = `${fontSize}px ${fontFamily}`
  ctx.textBaseline = 'middle';
  ctx.font = font
  let words = text?.split(' ');
  let lines = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
      } else {
          line = testLine;
      }
  }

  lines.push(line);

  if (lines.length * lineHeight > maxHeight) {
      lineHeight = maxHeight / lines.length
      wrapText({
          ctx, 
          text,
          x,
          y,
          maxWidth,
          maxHeight,
          fontFamily,
          fontSize: fontSize - 1,
          lineHeight: fontSize - 1 + 4
      })
  } else {
      y = y + ((maxHeight - (lines.length * lineHeight)) / 2)
      for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], x, y);
          y += lineHeight;
      }
  }
}

const textWithLetterSpace = ({ ctx, text = '', x, y, letterSpacing }) => {
  let posX = x;
  for (let i = 0; i < text.length; i++) {
      ctx.fillText(text.charAt(i), posX, y);
      posX += ctx.measureText(text.charAt(i)).width + letterSpacing;
  }
}

function getBrightness(r, g, b) {
  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
}

const ImageWithLogo = async ({ imgPath, imgName }) => {
  try {
    const image = await loadImage(imgPath)
    const logo = await loadImage(path.resolve(__dirname, './uploads/logo.png'))
    const topMask = await loadImage(path.resolve(__dirname, './uploads/mask/top.png'))
    const canvas = createCanvas(1000, 1000)
    const ctx = canvas.getContext('2d')

    if(image.width > image.height){
        let y = 0
        let x = (image.width - image.height) / 2
        let w = image.width - (image.width - image.height)
        let h = image.height
        ctx.drawImage(image, 
            x, y,
            w, h, 
            0, 0,
            1000, 1000
        )
    } else {
        let y = (image.height - image.width) / 2
        let x = 0
        let w = image.width
        let h = image.height  - (image.height - image.width)
        ctx.drawImage(image, 
            x, y,
            w, h, 
            0, 0,
            1000, 1000
        )
    }

    ctx.drawImage(topMask, 0, 0)
    ctx.drawImage(logo, 60, 60)

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.resolve(__dirname, `./output/${imgName}`), buffer)
  } catch (error) {
    console.log(error);
  }
};

const MainImage = async ({ txt = '', ctg = "", imgPath, imgName }) => {
  try {
    const ctgPadding = 28
    const image = await loadImage(imgPath)
    const logo = await loadImage(path.resolve(__dirname, './uploads/logo.png'))
    const bottomMask = await loadImage(path.resolve(__dirname, './uploads/mask/bottom.png'))
    const canvas = createCanvas(1000, 1000)
    const ctx = canvas.getContext("2d");

    if (image.width > image.height) {
        let y = 0
        let x = (image.width - image.height) / 2
        let w = image.width - (image.width - image.height)
        let h = image.height
        ctx.drawImage(image,
            x, y,
            w, h,
            0, 0,
            1000, 1000
        )
    } else {
        let y = (image.height - image.width) / 2
        let x = 0
        let w = image.width
        let h = image.height - (image.height - image.width)
        ctx.drawImage(image,
            x, y,
            w, h,
            0, 0,
            1000, 1000
        )
    }

    ctx.font = '36px GiloyExtraBold'
    const { width: ctgWidth } = ctx.measureText(ctg)
    const imageData = ctx.getImageData(80, 80, ctgWidth, 65);

    const data = imageData.data;
    const colors = {};

    for (let i = 0; i < data.length; i += 4) {
        const color = `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`;

        if (!colors[color]) {
            colors[color] = 0;
        }

        colors[color]++;
    }

    const maxColor = Math.max(...Object.values(colors))
    const bgColor = Object.keys(colors).find((el) => colors?.[el] === maxColor)

    const brightness = getBrightness(...bgColor.match(/\d+/g)); // 150.6

    if (brightness > 127.5) {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.roundRect(80, 80, (ctgWidth + (ctgPadding * 2)), 65, 16)
        ctx.fill();
        ctx.fillStyle = '#fff'
        ctx.textBaseline = 'top'
        ctx.fillText(ctg, 108, 92)
        
    } else {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.roundRect(80, 80, (ctgWidth + (ctgPadding * 2)), 65, 16)
        ctx.fill();
        ctx.fillStyle = '#000'
        ctx.textBaseline = 'top'
        ctx.fillText(ctg, 108, 92)
    }

    ctx.drawImage(bottomMask, 0, 210)

    ctx.fillStyle = '#fff'
    wrapText({
        ctx,
        text: txt,
        x: 80, y: 615,
        maxWidth: 840,
        maxHeight: 220,
        lineHeight: 57,
        fontFamily: 'MontBold',
        fontSize: 52
    });

    ctx.drawImage(logo, 80, 852)

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.resolve(__dirname, `./output/${imgName}`), buffer)
  } catch (error) {
    console.log(error);
  }
};

export default { ImageWithLogo, MainImage };
