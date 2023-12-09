import { Request, Response } from "express";
import * as request from "request";

export async function getCurrency(req: Request, res: Response) {
  await request(
    "http://cbu.uz/uzc/arkhiv-kursov-valyut/json/",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body).filter(
          (e) => e.Ccy == "USD" || e.Ccy == "EUR" || e.Ccy == "RUB",
        );

        res.send(data);
      }
    },
  );
}
