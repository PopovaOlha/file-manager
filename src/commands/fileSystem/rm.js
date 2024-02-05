import { access, rm } from "node:fs/promises";
import { F_OK } from "node:fs";

const deleteFile = async (fileRemove) => {
  try {
    const pathRemoveFile = fileRemove.replaceAll(`"`, "");
    const isFileDeleteExists = await access(pathRemoveFile, F_OK)
      .then(() => {
        return true;
      })
      .catch(() => {
        console.log("The file being deleted does not exist.");
        return false;
      });
    if (isFileDeleteExists) {
      await rm(pathRemoveFile);
      console.log(`The file has been delete from "${pathRemoveFile}"!`);
    }
  } catch (err) {
    return;
  }
};

export default deleteFile;
