import { constants, createReadStream, createWriteStream } from 'node:fs'
import { access } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import * as zlib from 'node:zlib'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage.js'

const decompressFile = async (pathToFileZip, pathToFileDecompressed) => {
	try {
		const isFileExists = await access(pathToFileZip, constants.F_OK)
			.then(() => true)
			.catch(() => {
				console.log(
					`The file to be decompressed does not exist: "${pathToFileZip}"`
				)
				return false
			})

		const isDecompressedFileExists = await access(
			pathToFileDecompressed,
			constants.F_OK
		)
			.then(() => {
				console.log(
					`The decompressed file already exists in this directory: "${pathToFileDecompressed}"`
				)
				return true
			})
			.catch(() => false)

		if (isFileExists && !isDecompressedFileExists) {
			const readStream = createReadStream(pathToFileZip)
			const writeStream = createWriteStream(pathToFileDecompressed)
			const brotliZip = zlib.createBrotliDecompress()
			await pipeline(readStream, brotliZip, writeStream)
			console.log(
				`File has been successfully decompressed and saved to: "${pathToFileDecompressed}"`
			)
		}
	} catch (error) {
		console.error(`Decompression operation failed: ${error.message}`)
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default decompressFile
