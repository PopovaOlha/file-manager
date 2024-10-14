import { createHash } from 'node:crypto'
import { F_OK } from 'node:fs'
import { access, readFile } from 'node:fs/promises'

const calculateHash = async filePath => {
	try {
		const isFileExists = await access(filePath, F_OK)
			.then(() => true)
			.catch(() => {
				console.log(`The file to be hashed does not exist: "${filePath}"`)
				return false
			})

		if (isFileExists) {
			const fileContent = await readFile(filePath)
			const hash = createHash('sha256').update(fileContent).digest('hex')
			console.log(`File hash: ${hash}`)
		}
	} catch (error) {
		console.error(`Hash calculation failed: ${error.message}`)
	}
}

export default calculateHash
