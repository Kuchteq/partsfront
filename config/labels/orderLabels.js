import { formatPhone } from '../formatHelpers';

let problemsLabels = [
	{
		id: 0,
		name: 'id',
		queryName: 'order_id',
		shown: true,
		widthClass: 'w2',
		default: true
	},
	{
		id: 1,
		name: 'Klient',
		queryName: 'client_name',
		shown: true,
		widthClass: 'w7'
	},
	{
		id: 2,
		name: 'Nazwa zamówienia',
		queryName: 'order_name',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 2,
		name: 'Przedmioty',
		queryName: 'parts',
		shown: true,
		widthClass: 'w25'
	},
	{
		id: 3,
		name: 'Ilość',
		queryName: 'items_amount',
		shown: true,
		widthClass: 'w3'
	},
	{
		id: 4,
		name: 'Wartość',
		queryName: 'items_value',
		shown: true,
		widthClass: 'w5'
	},

	{
		id: 6,
		name: 'Profit',
		queryName: 'profit',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: 'Data sprzedaży',
		queryName: 'sell_date',
		shown: false,
		widthClass: 'w7'
	}
];

export default problemsLabels;
