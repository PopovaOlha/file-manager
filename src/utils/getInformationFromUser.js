const getInformationFromUser = inform => {
	return inform.match(/(?:"[^"]*"|\S)+/g).map(item => item.replace(/"/g, ''))
}

export default getInformationFromUser
