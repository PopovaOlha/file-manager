import changeDirectory from "../commands/fileSystem/cd.js";
import goUpFromCurrentDirectory from "../commands/fileSystem/up.js";
import printListInformation from "../commands/fileSystem/list.js";
import readAndWriteFile from "../commands/fileSystem/cat.js";
import addNewFile from "../commands/fileSystem/add.js";
import renameFile from "../commands/fileSystem/rn.js";
import getInformationFromUser from "./getInformationFromUser.js";
import copyFile from "../commands/fileSystem/cp.js";
import moveFile from "../commands/fileSystem/mv.js";
import showCurrentDirectoryMessage from "./showCurrentDirectoryMessage.js";
import deleteFile from "../commands/fileSystem/rm.js";
import osInform from "../commands/os/os.js";
import calculateHash from "../commands/hash/hash.js";
import compressFile from "../commands/compression/compress.js";
import decompressFile from "../commands/compression/decompress.js";

const chooseCommand = (data, userName) => {
  const [command, ...args] = data.split(" ");

  try {
    if (command === "up") {
      goUpFromCurrentDirectory();
    } else if (command === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    } else if (command === "cd") {
      changeDirectory(args[0]?.replaceAll(`"`, ""));
    } else if (command === "ls") {
      printListInformation(args[0]?.replaceAll(`"`, ""));
    } else if (command === "cat") {
      readAndWriteFile(args[0]?.replaceAll(`"`, ""));
    } else if (command === "add") {
      addNewFile(args[0]?.replaceAll(`"`, ""));
    } else if (command === "rn") {
      const [oldFile, newFile] = getInformationFromUser("rn", args.join(" "));
      renameFile(oldFile, newFile);
    } else if (command === "cp") {
      const [pathFileToCopy, pathDirectoryToCopy] = getInformationFromUser("cp", args.join(" "));
      copyFile(pathFileToCopy, pathDirectoryToCopy);
    } else if (command === "mv") {
      const [pathFileToMove, pathDirectoryToMove] = getInformationFromUser("mv", args.join(" "));
      moveFile(pathFileToMove, pathDirectoryToMove);
    } else if (command === "rm") {
      deleteFile(args[0]);
    } else if (command === "os") {
      const commandOs = args.join(" ").replaceAll("--", "");
      osInform(commandOs);
    } else if (command === "hash") {
      calculateHash(args[0]?.replaceAll(`"`, ""));
    } else if (command === "compress") {
      const [pathToFile, pathToFileCompressed] = getInformationFromUser("compress", args.join(" "));
      compressFile(pathToFile.replaceAll(`"`, ""), pathToFileCompressed.replaceAll(`"`, ""));
    } else if (command === "decompress") {
      const [pathToCompressedFile, pathToFileDecompress] = getInformationFromUser("decompress", args.join(" "));
      decompressFile(pathToCompressedFile.replaceAll(`"`, ""), pathToFileDecompress.replaceAll(`"`, ""));
    } else {
      console.error("Invalid input");
      showCurrentDirectoryMessage();
    }
  } catch (err) {
    console.error("An error occurred:", err.message);
    showCurrentDirectoryMessage();
  }
};

export default chooseCommand;