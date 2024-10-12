import { access } from 'fs/promises'
import { createReadStream, createWriteStream, F_OK } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage'

const copyFile = async (fileCopy, pathDirectoryToCopy) => {
	try {
		if (!pathDirectoryToCopy) throw Error
		const pathFileCopy = fileCopy.replaceAll(`"`, '')
		const nameFile = pathFileCopy.replace(/^.*[\\\/]/, '').replaceAll(`"`, '')
		const pathDirectoryToCopyFile = pathDirectoryToCopy.replaceAll(`"`, '')
		const pathToDirectory = join(pathDirectoryToCopyFile, nameFile)
		const isFileToCopyExists = await access(pathFileCopy, F_OK)
			.then(() => {
				return true
			})
			.catch(() => {
				console.log('The file being copied does not exist.')
				return false
			})
		const isFileExistInCopyDirectory = await access(pathToDirectory, F_OK)
			.then(() => {
				console.log('The file has already been created in this directory.')
				return true
			})
			.catch(() => false)

		if (isFileToCopyExists) {
			if (!isFileExistInCopyDirectory) {
				const rs = createReadStream(pathFileCopy)
				const ws = createWriteStream(pathToDirectory)
				await pipeline(rs, ws)
			}
		}
	} catch {
		console.log('Copying file is not possible! Check the path or file name!')
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default copyFile
