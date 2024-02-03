import { chdir } from "node:process";
import showCurrentDirectoryMessage from "../../fileUtils/showCurrentDirectoryMessage";

export default function goUpFromCurrentDirectory() {
  try {
    chdir('..');
    showCurrentDirectoryMessage();
  } catch (error) {
    console.error("Failed to navigate up:", error.message);
  }
}