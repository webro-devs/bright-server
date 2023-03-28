import { Router } from "express";
import * as currencyController from "../modules/currency/currency.controller";

const router = Router();

router.get("/currency", currencyController.getCurrency);

module.exports = router;
