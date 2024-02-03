import { readdir, stat } from 'fs/promises';
import path from 'path';

async function listDirectoryContents(directory) {
  try {
    const items = await readdir(directory);

    const sortedItems = (await Promise.all(items.map(async (item, index) => {
      const itemPath = path.join(directory, item);
      const stats = await stat(itemPath);

      return {
        index,
        name: item,
        type: stats.isDirectory() ? 'directory' : 'file',
      };
    }))).sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type);
      }
      return a.name.localeCompare(b.name);
    });

    console.log('Index\tName\tType');
    sortedItems.forEach(({ index, name, type }) => {
      console.log(`${index}\t${name}\t${type}`);
    });
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
}

export default listDirectoryContents;