import { rename } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import showCurrentDirectoryMessage from '../../fileUtils/showCurrentDirectoryMessage';

const renameFile = async (oldFile, newFile) => {
  try {
    if (!newFile) {
      throw new Error('New file name is required.');
    }

    const pathToOldFile = resolve(oldFile.replaceAll(`"`, ''));
    const pathToDirectory = dirname(pathToOldFile);
    const newFileName = basename(newFile.replaceAll(`"`, ''));
    const pathToRenamedFile = resolve(pathToDirectory, newFileName);

    await rename(pathToOldFile, pathToRenamedFile);

    console.log(`The file has been renamed as "${newFileName}"`);
  } catch (error) {
    console.error(`Operation failed! Renaming is not possible: ${error.message}`);
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default renameFile;