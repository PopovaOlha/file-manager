import { argv, chdir, stdin, stdout } from "node:process";
import { homedir } from "node:os";
import * as readline from "readline/promises";

chdir(homedir());

const [argName] = argv.slice(2).map(arg => arg.split('=')[1]) || [];
const userName = argName !== "your_username" ? argName : "Anonymous";

const inputInterface = readline.createInterface({ input: stdin, output: stdout });

console.info(`Starting working directory ${homedir()}`);
console.info(`Welcome to the File Manager, ${userName}!`);

const handleError = (err) => console.error(`Error: ${err.message}`);

inputInterface.on("line", async (data) => {
  try {
    console.info(`User input: ${data}`);
  } catch (error) {
    handleError(error);
  }
})
  .on("SIGINT", () => {
    console.info(`Thank you for using File Manager, ${userName}, goodbye!`);
    inputInterface.close();
  })
  .on("error", handleError);