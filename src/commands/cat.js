import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import showCurrentDirectoryMessage from '../../fileUtils/showCurrentDirectoryMessage';

export default async function readAndWriteFile(pathString) {
  try {
    const pathToFile = join(pathString);
    const readStream = createReadStream(pathToFile, { encoding: 'utf8' });

    let data = '';

    readStream.on('data', (chunk) => {
      data += chunk;
    });

    readStream.on('end', () => {
      console.log(data);
      showCurrentDirectoryMessage();
    });

    readStream.on('error', (error) => {
      console.error(`Operation failed! Unable to read the file: ${pathString}`);
      console.error('Error details:', error.message);
      showCurrentDirectoryMessage();
    });
  } catch (error) {
    console.error('Operation failed');
    console.error('Error details:', error.message);
    showCurrentDirectoryMessage();
  }
}