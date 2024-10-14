import { cpus, EOL, userInfo } from 'node:os'
import { arch } from 'node:process'
import showCurrentDirectoryMessage from '../../utils/showCurrentDirectoryMessage.js'

const osInform = command => {
	try {
		const cpusInfo = cpus().map(({ model, speed }) => ({
			model,
			speed: `${(speed / 1000).toFixed(2)} GHz`,
		}))

		const { username, homedir } = userInfo()

		const osInformation = {
			EOL: JSON.stringify(EOL),
			cpus: cpusInfo,
			homedir,
			username,
			architecture: arch,
		}

		if (osInformation.hasOwnProperty(command)) {
			const result = osInformation[command]
			command === 'cpus' ? console.table(result) : console.log(result)
		} else {
			throw new Error('Invalid command')
		}
	} catch (error) {
		console.error(`Operation failed: ${error.message}`)
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default osInform
