import { connectSocket } from "./modules/socket/index";
import * as express from "express";
require("dotenv").config();
// import { Server } from "socket.io";
import * as http from "http";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
const fileUpload = require("express-fileupload");
var compression = require('express-compression')
import { TypeOrmDataSource } from "./config";

import { AccessTokenMiddleware } from "./modules/auth/middleware";

const app: express.Application = express();
const server = http.createServer(app);
// const io = new Server(server);

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

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
      chatRouter,
      currencyRouter,
    } = require("./router");
    connectSocket(server);
    app.use(compression({ filter: shouldCompress }))
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
      chatRouter,
      currencyRouter,
    );

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
