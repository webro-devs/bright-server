import { Telegraf } from "telegraf";
import * as path from "path";
import * as fs from "fs";
const app = new Telegraf("6245586674:AAFXgjqXWjOJ3JDMMjd9iwYs6gSVqPYMmdo");

const telegram = async ({ title, desc, link }) => {
  const text = `<b>${title || ""}</b>
	${desc || ""}
	<b>Batafsil: </b>${String(link) || ""}`;
  await app.telegram.sendPhoto(
    "-1001601225733",
    {
      source: fs.readFileSync(path.resolve(__dirname, "./output/output.png")),
    },
    {
      caption: text,
      parse_mode: "HTML",
    },
  );
};

export default telegram;
