import { formatPhone } from '../formatHelpers';

let clientsLabels = [
	{
		id: 0,
		name: _ => _('clients.id'),
		queryName: 'client_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: _ => _('clients.name'),
		queryName: 'client_name',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 2,
		name: _ => _('clients.joined_at'),
		queryName: 'join_date',
		shown: false,
		widthClass: 'w5'
	},
	{
		id: 4,
		name: _ => _('clients.phone'),
		queryName: 'phone',
		shown: true,
		widthClass: 'w8',
		format: formatPhone
	},
	{
		id: 3,
		name: _ => _('clients.email'),
		queryName: 'email',
		shown: true,
		widthClass: 'w10'
	},

	{
		id: 6,
		name: _ => _('clients.address'),
		queryName: 'adress',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: _ => _('clients.nip'),
		queryName: 'nip',
		shown: false,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: _ => _('clients.note'),
		queryName: 'client_short_note',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: _ => _('clients.last_order'),
		queryName: 'last_purchased_part',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: _ => _('clients.last_order_date'),
		queryName: 'last_sold_date',
		shown: true,
		widthClass: 'w5'
	}
];

export default clientsLabels;
