import { cwd } from "node:process";
import { readdir } from "node:fs/promises";
import showCurrentDirectoryMessage from "../../utils/showCurrentDirectoryMessage.js";

export default async function printListInformation() {
  const files = [];
  const folders = [];
  const other = [];
  try {
    const listFile = await readdir(cwd(), { withFileTypes: true });
    listFile.forEach((el) => {
      if (el.isFile()) {
        files.push(el);
      } else if (el.isDirectory()) {
        folders.push(el);
      } else {
        other.push(el);
      }
    });

    console.table([
      ...folders
        .map((el) => el.name)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((file) => ({
          Name: file,
          Type: "directory",
        })),
      ...files
        .map((el) => el.name)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((file) => ({ Name: file, Type: "file" })),
      ...other
        .map((el) => el.name)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((file) => ({ Name: file, Type: "another type" })),
    ]);
    showCurrentDirectoryMessage();
  } catch (err) {
    console.log("Operation failed");
  }
}
