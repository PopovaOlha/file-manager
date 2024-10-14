import { constants, createReadStream, createWriteStream } from 'node:fs'
import { access } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import * as zlib from 'node:zlib'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage.js'

const compressFile = async (pathToFile, pathToFileCompressed) => {
	try {
		const isFileExists = await access(pathToFile, constants.F_OK)
			.then(() => true)
			.catch(() => {
				console.log(`The file to be compressed does not exist: "${pathToFile}"`)
				return false
			})

		const isZipExists = await access(pathToFileCompressed, constants.F_OK)
			.then(() => {
				console.log(
					`The compressed file already exists in this directory: "${pathToFileCompressed}"`
				)
				return true
			})
			.catch(() => false)

		if (isFileExists && !isZipExists) {
			const readStream = createReadStream(pathToFile, 'utf-8')
			const writeStream = createWriteStream(pathToFileCompressed)
			const brotliZip = zlib.createBrotliCompress({
				params: {
					[zlib.constants.BROTLI_PARAM_QUALITY]:
						zlib.constants.BROTLI_MIN_QUALITY,
				},
			})
			await pipeline(readStream, brotliZip, writeStream)
			console.log(
				`File has been successfully compressed and saved to: "${pathToFileCompressed}"`
			)
		}
	} catch (error) {
		console.error(`Compression operation failed: ${error.message}`)
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default compressFile
