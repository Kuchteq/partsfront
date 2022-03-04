
let problemsLabels = [
	{
		id: 0,
		name: _ => _('problems.id'),
		queryName: 'problem_id',
		shown: true,
		widthClass: 'w3',
		default: true
	},
	{
		id: 1,
		name: _ => _('problems.computer_name'),
		queryName: 'computer_name',
		shown: true,
		widthClass: 'w7'
	},
	{
		id: 2,
		name: _ => _('problems.computer_id'),
		queryName: 'computer_Id',
		shown: false,
		widthClass: 'w3'
	},
	{
		id: 3,
		name: _ => _('problems.problem_desc'),
		queryName: 'problem_note',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 4,
		name: _ => _('problems.return_date'),
		queryName: 'hand_in_date',
		shown: true,
		widthClass: 'w3'
	},

	{
		id: 5,
		name: _ => _('problems.deadline'),
		queryName: 'deadline_date',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 6,
		name: _ => _('problems.client'),
		queryName: 'client_name',
		shown: false,
		widthClass: 'w7'
	},
	{
		id: 7,
		name: _ => _('problems.status'),
		queryName: 'finished',
		determining: (v) => {
			if (v == true)
				return true
			return false
		} //should be grayed out if true
	}
];

export default problemsLabels;
