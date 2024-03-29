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

const formatDateOnly = (value) => {
	var d = new Date(value);
	return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
};

const formatPhone = (value) => {
	value = value.toString();
	return `+${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8, 11)}`;
};

//checkers
const checkLength = (val, dest, ignoreSpaces) => {
	if (ignoreSpaces) {
		return val.replace(/\s/g, '').length == dest ? true : false;
	}
	return val.length == dest ? true : false;
};

export { getCurrentTime, formatPhone, checkLength, formatDateOnly };
