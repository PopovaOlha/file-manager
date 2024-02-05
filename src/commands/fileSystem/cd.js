import { chdir } from "node:process";
import showCurrentDirectoryMessage from "../../utils/showCurrentDirectoryMessage.js";

export default function changeDirectory(path) {
  try {
    chdir(path);
    showCurrentDirectoryMessage();
  } catch (err) {
    console.log("Operation failed");
  }
}
