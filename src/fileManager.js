import { argv, chdir, stdin, stdout, exit } from "node:process";
import { homedir } from "node:os";
import * as readline from "readline/promises";
import showCurrentDirectoryMessage from "./utils/showCurrentDirectoryMessage.js";
import chooseCommand from "./utils/chooseCommand.js";

chdir(homedir());

const args = argv.slice(2);
const argName = String(args).split("=")[1];
const userName = argName !== "your_username" ? argName : "Anonymous";

const rl = readline.createInterface({ input: stdin, output: stdout });

const startWorkingDirectory = homedir();

console.info(`Starting working directory ${startWorkingDirectory}`);
console.info(`Welcome to the File Manager, ${userName}!`);

showCurrentDirectoryMessage();

rl.on("line", async (data) => chooseCommand(data, userName))
  .on("SIGINT", () => rl.close())
  .on("close", () =>
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  )
  .on("error", () => console.error("Invalid input"));
