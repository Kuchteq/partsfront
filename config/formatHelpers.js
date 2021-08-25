function checkTime(i) {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
}

const getCurrentTime = () => {
	const today = new Date();
	return (
		today.toISOString().substring(0, 10) +
		' ' +
		checkTime(today.getHours()) +
		':' +
		checkTime(today.getMinutes())
	);
};

const formatPhone = (value) => {
	return `+${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8, 11)}`;
};

//checkers
const checkLength = (val, dest, ignoreSpaces) => {
	console.log(val.replace(/\s/g, '').length);
	console.log(ignoreSpaces);
	if (ignoreSpaces) {
		return val.replace(/\s/g, '').length == dest ? true : false;
	}
	return val.length == dest ? true : false;
};

export { getCurrentTime, formatPhone, checkLength };
