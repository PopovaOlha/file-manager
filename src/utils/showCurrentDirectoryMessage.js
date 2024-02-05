import { cwd } from "node:process";

export default function showCurrentDirectoryMessage() {
  console.info(`You are currently in ${cwd()}`);
}
