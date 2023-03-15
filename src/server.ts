import * as express from "express";
require("dotenv").config();
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
const fileUpload = require("express-fileupload");
import { TypeOrmDataSource } from "./config";

import { AccessTokenMiddleware } from "./modules/auth/middleware";

const app: express.Application = express();
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));

TypeOrmDataSource.initialize()
  .then(() => {
    const {
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      newsRouter,
      authRouter,
    } = require("./router");

    app.use(express.json());
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(AccessTokenMiddleware);
    app.use(
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      newsRouter,
      authRouter,
    );

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
