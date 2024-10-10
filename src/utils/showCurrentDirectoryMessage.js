import { cwd } from 'node:process'

const showCurrentDirectoryMessage = () => {
	console.info(`You are currently in ${cwd}`)
}

export default showCurrentDirectoryMessage
