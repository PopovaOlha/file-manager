import { homedir } from 'node:os'
import { argv, chdir, stdin, stdout } from 'node:process'
import { join, parse } from 'path'
import * as readline from 'readline/promises'
import chooseCommand from './utils/chooseCommand.js'
import pathExist from './utils/pathExist.js'
import showCurrentDirectoryMessage from './utils/showCurrentDirectoryMessage.js'

const rl = readline.createInterface({ input: stdin, output: stdout })
const args = argv.slice(2)
const argName = String(args).split('=')[1]
const userName = argName !== 'your_username' ? argName : 'Anonymous'

const homeDir = homedir()
const rootDir = parse(process.cwd()).root
let currentDir = homeDir

chdir(currentDir)

console.info(`Starting working directory: ${currentDir}`)
console.info(`Welcome to the File Manager, ${userName}!`)

showCurrentDirectoryMessage(currentDir)

const updateCurrentDir = async path => {
	if (path === 'up') {
		if (currentDir === rootDir) return
		currentDir = join(currentDir, '..')
	} else if (typeof path === 'string') {
		if (path.startsWith('.')) {
			const interimPath = join(
				currentDir,
				path.replace(/^["'](.+(?=["']$))["']$/, '$1')
			)

			if (!(await pathExist(interimPath))) {
				console.log('Operation failed: path does not exist.')
				return
			}

			currentDir = interimPath
		} else {
			const interimPath = path.replace(/^["'](.+(?=["']$))["']$/, '$1')
			if (!(await pathExist(interimPath))) {
				console.log('Operation failed: path does not exist.')
				return
			}

			currentDir = interimPath
		}
	}

	chdir(currentDir)
	return currentDir
}

rl.on('line', async data => {
	await chooseCommand(data, userName, updateCurrentDir)
})
	.on('SIGINT', () => rl.close())
	.on('close', () => {
		console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
	})
	.on('error', () => console.error('Invalid input'))
