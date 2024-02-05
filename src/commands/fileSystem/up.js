import { chdir } from "node:process";
import showCurrentDirectoryMessage from "../../utils/showCurrentDirectoryMessage.js";

export default function goUpFromCurrentDirectory() {
  try {
    chdir("..");
    showCurrentDirectoryMessage();
  } catch (err) {
    console.error("Operation failed");
  }
}