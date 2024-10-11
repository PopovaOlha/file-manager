import { chdir } from 'node:process'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage'

const changeDirectory = path => {
	try {
		chdir(path)
		showCurrentDirectoryMessage()
	} catch (err) {
		console.log('Operation failed')
	}
}

export default changeDirectory
