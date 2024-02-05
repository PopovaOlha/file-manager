import { access, rm } from 'node:fs/promises';
import { F_OK } from 'node:fs';

const deleteFile = async (fileToRemove) => {
  try {
    const pathRemoveFile = fileToRemove.replaceAll(`"`, '');

    // Проверка существования файла, который нужно удалить
    const isFileDeleteExists = await access(pathRemoveFile, F_OK)
      .then(() => true)
      .catch(() => {
        console.log(`The file being deleted does not exist: "${pathRemoveFile}"`);
        return false;
      });

    if (isFileDeleteExists) {
      await rm(pathRemoveFile);
      console.log(`The file has been successfully deleted from "${pathRemoveFile}"!`);
    }
  } catch (error) {
    console.error(`Deleting file failed: ${error.message}`);
  }
};

export default deleteFile;