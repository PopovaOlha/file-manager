import { rename } from 'node:fs/promises'
import { resolve } from 'node:path'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage'

const renameFile = async (oldFile, newFile) => {
	try {
		const pathToDirectory = oldFile.match(/^.*[\\\/]/)[0].replaceAll(`"`, '')
		if (!newFile) throw Error
		const pathToOldFile = resolve(oldFile.replaceAll(`"`, ''))
		const newFileNameRight = newFile.replaceAll(`"`, '')
		const pathToRenameFile = resolve(pathToDirectory, newFileNameRight)
		await rename(pathToOldFile, pathToRenameFile).then(
			console.log(`The file has been renamed as "${newFileNameRight}"`)
		)
	} catch (err) {
		console.log(
			'Operation failed! Renaming is not possible! Check the path or file name!'
		)
	}
	showCurrentDirectoryMessage()
}

export default renameFile
