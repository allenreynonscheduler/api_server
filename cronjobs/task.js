const cron = require("node-cron");

cron.schedule("0 * * * *", () => {
    console.log("Running a task every hour");
});
