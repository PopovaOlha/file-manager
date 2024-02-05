import copyFile from './cp.js';
import { access, rm } from 'node:fs/promises';
import { F_OK } from 'node:fs';
import { join, basename } from 'node:path';

const moveFile = async (fileMovePath, pathDirectoryToMove) => {
  try {
    const nameFile = basename(fileMovePath.replaceAll(`"`, ''));
    const pathDirectoryToMoveFile = pathDirectoryToMove.replaceAll(`"`, '');
    const pathToDirectory = join(pathDirectoryToMoveFile, nameFile);

    const isFileExistInCopyDirectory = await access(pathToDirectory, F_OK)
      .then(() => true)
      .catch(() => false);

    await copyFile(fileMovePath, pathDirectoryToMove);

    if (!isFileExistInCopyDirectory) {
      await rm(fileMovePath);
      console.log(`File "${nameFile}" has been moved and removed from the original location.`);
    } else {
      console.log(`File "${nameFile}" has been moved to the destination directory.`);
    }
  } catch (error) {
    console.error(`Moving file failed: ${error.message}`);
  }
};

export default moveFile;