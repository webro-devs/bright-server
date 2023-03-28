const categoryRouter = require("./category.router");
const permissionRouter = require("./permission.router");
const adminRouter = require("./admin.router");
const positionRouter = require("./position.router");
const newsRouter = require("./news.router");
const authRouter = require("./auth.rout");
const chatRouter = require("./chat.router");
const notificationRouter = require("./notification.rout");
const currencyRouter = require("./currency.router");

module.exports = {
  categoryRouter,
  permissionRouter,
  adminRouter,
  positionRouter,
  newsRouter,
  authRouter,
  notificationRouter,
  chatRouter,
  currencyRouter,
};
