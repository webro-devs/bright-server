import * as express from "express";
require("dotenv").config();
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import zip from "express-zip";
const fileUpload = require("express-fileupload");
import { TypeOrmDataSource } from "./config";

import { AccessTokenMiddleware } from "./modules/auth/middleware";

const app: express.Application = express();

TypeOrmDataSource.initialize()
  .then(() => {
    const {
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      newsRouter,
      authRouter,
      notificationRouter,
    } = require("./router");

    app.use(cors({ origin: true, credentials: true }));
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
      notificationRouter,
    );

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
