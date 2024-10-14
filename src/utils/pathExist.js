import { stat } from 'fs/promises'

const pathExist = async str => {
	try {
		await stat(str)
		return true
	} catch (error) {
		return false
	}
}

export default pathExist
