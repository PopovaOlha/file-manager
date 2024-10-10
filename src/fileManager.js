import { argv } from 'node:process'
import showCurrentDirectoryMessage from './utils/showCurrentDirectoryMessage.js'

const args = argv.slice(2)
const argName = String(args).split('=')[1]
const userName = argName !== 'your_username' ? argName : 'Anonymous'

console.info(`Welcome to the File Manager, ${userName}!`)

showCurrentDirectoryMessage()
