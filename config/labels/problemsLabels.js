import { formatPhone } from '../formatHelpers';

let problemsLabels = [
	{
		id: 0,
		name: 'Problem id',
		queryName: 'problem_id',
		shown: true,
		widthClass: 'w3',
		default: true
	},
	{
		id: 1,
		name: 'Nazwa komputera',
		queryName: 'computer_name',
		shown: true,
		widthClass: 'w7'
	},
	{
		id: 2,
		name: 'komp id',
		queryName: 'computer_Id',
		shown: false,
		widthClass: 'w3'
	},
	{
		id: 3,
		name: 'Opis problemu',
		queryName: 'problem_note',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 4,
		name: 'Data oddania',
		queryName: 'hand_in_date',
		shown: true,
		widthClass: 'w3'
	},

	{
		id: 6,
		name: 'Deadline',
		queryName: 'deadline_date',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: 'Klient',
		queryName: 'client_name',
		shown: false,
		widthClass: 'w7'
	},
	{
		id: 7,
		name: 'Finished',
		queryName: 'finished',
		determining: true //should be grayed out if true
	}
];

export default problemsLabels;
