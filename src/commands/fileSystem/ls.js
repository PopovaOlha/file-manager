import fs from 'fs'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage.js'

const listDirectoryContents = () => {
	try {
		const currentDir = process.cwd()
		const contents = fs.readdirSync(currentDir, { withFileTypes: true })

		const formattedContents = contents.map((dirent, index) => ({
			index,
			name: dirent.name,
			type: dirent.isDirectory() ? 'directory' : 'file',
		}))

		formattedContents.sort((a, b) => {
			if (a.type === b.type) return a.name.localeCompare(b.name)
			return a.type === 'directory' ? -1 : 1
		})

		console.table(formattedContents)
	} catch (err) {
		console.error('Operation failed')
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default listDirectoryContents
