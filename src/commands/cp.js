import { createReadStream, createWriteStream, constants } from 'node:fs';
import { access } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { pipeline } from 'node:stream/promises';
import showCurrentDirectoryMessage from '../../fileUtils/showCurrentDirectoryMessage';

const copyFile = async (fileCopy, pathDirectoryToCopy) => {
  try {
    if (!pathDirectoryToCopy) {
      throw new Error('Destination directory is required.');
    }

    const pathFileCopy = fileCopy.replaceAll(`"`, '');
    const nameFile = basename(pathFileCopy);
    const pathDirectoryToCopyFile = pathDirectoryToCopy.replaceAll(`"`, '');
    const pathToDirectory = join(pathDirectoryToCopyFile, nameFile);

    await access(pathFileCopy, constants.F_OK);

    await access(pathToDirectory, constants.F_OK).then(() => {
      console.log('The file already exists in this directory.');
      throw new Error('File already exists in the destination directory.');
    });

    const readStream = createReadStream(pathFileCopy);
    const writeStream = createWriteStream(pathToDirectory);
    await pipeline(readStream, writeStream);

    console.log(`File "${nameFile}" has been successfully copied.`);
  } catch (error) {
    console.error(`Copying file failed: ${error.message}`);
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default copyFile;