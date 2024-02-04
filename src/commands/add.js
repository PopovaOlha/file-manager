import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import showCurrentDirectoryMessage from '../../fileUtils/showCurrentDirectoryMessage';

const addNewFile = async (nameFile) => {
  try {
    const pathToFile = resolve(nameFile);

    await writeFile(pathToFile, '', { flag: 'wx' });

    console.log('File created!');
  } catch (error) {
    console.error(`Operation failed! Unable to create or file already exists: ${error.message}`);
  } finally {
    showCurrentDirectoryMessage();
  }
};

export default addNewFile;