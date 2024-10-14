import compressFile from '../commands/compression/compress.js'
import decompressFile from '../commands/compression/decompress.js'
import addNewFile from '../commands/fileSystem/add.js'
import readAndWriteFile from '../commands/fileSystem/cat.js'
import changeDirectory from '../commands/fileSystem/cd.js'
import copyFile from '../commands/fileSystem/cp.js'
import printListInformation from '../commands/fileSystem/ls.js'
import moveFile from '../commands/fileSystem/mv.js'
import deleteFile from '../commands/fileSystem/rm.js'
import renameFile from '../commands/fileSystem/rn.js'
import goUpFromCurrentDirectory from '../commands/fileSystem/up.js'
import calculateHash from '../commands/hash/hash.js'
import osInform from '../commands/os/os.js'
import getInformationFromUser from './getInformationFromUser.js'
import showCurrentDirectoryMessage from './showCurrentDirectoryMessage.js'

const commandHandlers = {
	up: () => goUpFromCurrentDirectory(),
	'.exit': userName => {
		console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
		process.exit()
	},
	cd: args => changeDirectory(args[0]?.replaceAll(`"`, '')),
	ls: args => printListInformation(args[0]?.replaceAll(`"`, '')),
	cat: args => readAndWriteFile(args[0]?.replaceAll(`"`, '')),
	add: args => addNewFile(args[0]?.replaceAll(`"`, '')),
	rn: args => {
		const [oldFile, newFile] = getInformationFromUser('rn', args.join(' '))
		renameFile(oldFile, newFile)
	},
	cp: args => {
		const [pathFileToCopy, pathDirectoryToCopy] = getInformationFromUser(
			'cp',
			args.join(' ')
		)
		copyFile(pathFileToCopy, pathDirectoryToCopy)
	},
	mv: args => {
		const [pathFileToMove, pathDirectoryToMove] = getInformationFromUser(
			'mv',
			args.join(' ')
		)
		moveFile(pathFileToMove, pathDirectoryToMove)
	},
	rm: args => deleteFile(args[0]),
	os: args => {
		const commandOs = args.join(' ').replaceAll('--', '')
		osInform(commandOs)
	},
	hash: args => calculateHash(args[0]?.replaceAll(`"`, '')),
	compress: args => {
		const [pathToFile, pathToFileCompressed] = getInformationFromUser(
			'compress',
			args.join(' ')
		)
		compressFile(
			pathToFile.replaceAll(`"`, ''),
			pathToFileCompressed.replaceAll(`"`, '')
		)
	},
	decompress: args => {
		const [pathToCompressedFile, pathToFileDecompress] = getInformationFromUser(
			'decompress',
			args.join(' ')
		)
		decompressFile(
			pathToCompressedFile.replaceAll(`"`, ''),
			pathToFileDecompress.replaceAll(`"`, '')
		)
	},
}

const chooseCommand = (data, userName) => {
	const [command, ...args] = data.split(' ')

	try {
		const handler = commandHandlers[command]
		if (handler) {
			handler(args, userName)
		} else {
			console.error('Invalid input')
		}
	} catch (err) {
		console.error('An error occurred:', err.message)
	} finally {
		showCurrentDirectoryMessage()
	}
}

export default chooseCommand
