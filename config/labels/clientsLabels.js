import { formatPhone } from '../formatHelpers';

let clientsLabels = [
	{
		id: 0,
		name: 'id',
		queryName: 'client_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: 'Nazwa',
		queryName: 'client_name',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 2,
		name: 'Dołączono',
		queryName: 'join_date',
		shown: false,
		widthClass: 'w5'
	},
	{
		id: 4,
		name: 'Telefon',
		queryName: 'phone',
		shown: true,
		widthClass: 'w8',
		format: formatPhone
	},
	{
		id: 3,
		name: 'Email',
		queryName: 'email',
		shown: true,
		widthClass: 'w10'
	},

	{
		id: 6,
		name: 'Adres',
		queryName: 'adress',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: 'NIP',
		queryName: 'nip',
		shown: false,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: 'Notatka',
		queryName: 'client_short_note',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: 'Ostatnia zakupiona rzecz',
		queryName: 'last_purchased_part',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: 'Data zakupu',
		queryName: 'last_sold_date',
		shown: true,
		widthClass: 'w5'
	}
];

export default clientsLabels;
