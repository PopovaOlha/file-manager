import { chdir } from "node:process";
import showCurrentDirectoryMessage from "../../fileUtils/showCurrentDirectoryMessage";

export default function changeDirectory(path) {
  try {
    chdir(path);
    showCurrentDirectoryMessage();
  } catch (err) {
    console.log("Operation failed");
  }
}