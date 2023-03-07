import * as express from "express";
import { TypeOrmDataSource } from "./config";
import * as dotenv from "dotenv";
dotenv.config();
import { AccessTokenMiddleware } from "./modules/auth/middleware";

const app: express.Application = express();

TypeOrmDataSource.initialize()
  .then(() => {
    const {
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      authRouter,
    } = require("./router");

    app.use(express.json());
    app.use(AccessTokenMiddleware);
    app.use(
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
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
