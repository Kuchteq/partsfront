const monthNames = [
	'Styczeń',
	'Luty',
	'Marzec',
	'Kwiecień',
	'Maj',
	'Czerwiec',
	'Lipiec',
	'Sierpień',
	'Wrzesień',
	'Październik',
	'Listopad',
	'Grudzień'
];

const monthBack = (date) => {
	if (date.month <= 1) {
		date.month = 12;
		date.year -= 1;
		return date;
	}
	date.month -= 1;
	return date;
};

const toQueryDate = (date) => {
	return `/orders/${date.year}/${date.month}/`;
};

const formatDate = (date) => {
	return `${monthNames[date.month - 1]} ${date.year}`;
};

export { monthBack, toQueryDate, formatDate };
