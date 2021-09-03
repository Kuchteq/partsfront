import { formatDateOnly } from '../formatHelpers';

let computerLabels = [
	{
		id: 0,
		name: 'id',
		queryName: 'computer_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: 'Nazwa komputera',
		queryName: 'computer_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 2,
		name: 'Procesor',
		queryName: 'processor_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 3,
		name: 'Płyta główna',
		queryName: 'motherboard_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 3,
		name: 'Karta graficzna',
		queryName: 'graphics_card_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 4,
		name: 'Wartość',
		queryName: 'computer_value',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: 'Notatka',
		queryName: 'short_note',
		shown: false,
		widthClass: 'w20'
	},
	{
		id: 7,
		name: 'Złożono',
		queryName: 'assembled_at',
		shown: true,
		widthClass: 'w7',
		format: formatDateOnly
	}
];

export default computerLabels;
