const uuid = ():string => {
	return Math.trunc(Math.random() * 10000000000 + 3).toString()
}

export default uuid