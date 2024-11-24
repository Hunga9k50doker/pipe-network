const { loginWithAllAccounts } = require("./services/login");
const { register } = require("./services/register");
const { sendHeartbeat } = require("./services/heartbeat");
const { runNodeTests } = require("./services/nodes");
const { askQuestion } = require("./utils/userInput");
const { banner } = require("./utils/banner");
const { logger } = require("./utils/logger");

(async () => {
  logger(banner, "warn");
  const choice = await askQuestion("Choose an option:\n1. Register\n2. Login\n3. Run Node\n> ");

  switch (choice) {
    case "1":
      logger(`Registering new account...`);
      await register();
      break;
    case "2":
      logger(`Fetching Accounts in accounts.json and login...`);
      await loginWithAllAccounts();
      break;
    case "3":
      logger(`Running All Accounts using Proxy...`);
      await sendHeartbeat();
      setInterval(sendHeartbeat, 5 * 60 * 1000); // Send heartbeat every 5 minutes
      await runNodeTests();
      setInterval(runNodeTests, 30 * 60 * 1000); // Run Node tests every 30 minutes
      logger("HeartBeat will send every 5 minutes and node result will send every 30 minutes", "debug");
      logger("Dont change that, or your accounts will getting banned.", "debug");
      break;
    default:
      logger("Invalid choice. Exiting.", "error");
  }
})();
