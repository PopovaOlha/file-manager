import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage'

const addNewFile = async nameFile => {
	try {
		const pathToFile = resolve(nameFile)
		await writeFile(pathToFile, '', { flag: 'wx' })
		console.log('File created!')
	} catch (err) {
		console.log(
			'Operation failed! Invalid path or such file already exists in this directory'
		)
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default addNewFile
