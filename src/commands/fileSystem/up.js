import { chdir } from 'node:process'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage'

const goUpFromCurrentDirectory = () => {
	try {
		chdir('..')
		showCurrentDirectoryMessage()
	} catch (err) {
		console.error('Operation failed')
	}
}

export default goUpFromCurrentDirectory
