
let problemsLabels = [
	{
		id: 0,
		name: _ => _('history.id'),
		queryName: 'history_id',
		shown: true,
		widthClass: 'w3',
		default: true
	},
	{
		id: 1,
		name: _ => _('history.action'),
		queryName: 'prefix',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 2,
		name: _ => _('history.details'),
		queryName: 'details',
		shown: true,
		widthClass: 'w40'
	},
	{
		id: 3,
		name: _ => _('history.date'),
		queryName: 'at_time',
		shown: true,
		widthClass: 'w10'
	}
];

export default problemsLabels;
