import * as cron from "node-schedule";

const CronJob = (date, func) => {
  cron.scheduleJob(date, async () => {
    await func();
  });
};

export default CronJob;
