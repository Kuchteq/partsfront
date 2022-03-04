import { formatDateOnly } from '../formatHelpers';

let computerLabels = [
	{
		id: 0,
		name: _ => _('sets.id'),
		queryName: 'computer_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: _ => _('sets.computer_name'),
		queryName: 'computer_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 2,
		name: _ => _('sets.processor'),
		queryName: 'processor_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 3,
		name: _ => _('sets.motherboard'),
		queryName: 'motherboard_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 3,
		name: _ => _('sets.graphics_card'),
		queryName: 'graphics_card_name',
		shown: true,
		widthClass: 'w20'
	},
	{
		id: 4,
		name: _ => _('sets.value'),
		queryName: 'computer_value',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: _ => _('sets.note'),
		queryName: 'short_note',
		shown: false,
		widthClass: 'w20'
	},
	{
		id: 7,
		name: _ => _('sets.assembled_at'),
		queryName: 'assembled_at',
		shown: true,
		widthClass: 'w7',
		format: formatDateOnly
	},
	{
		id: 8,
		name: _ => _('sets.in_order'),
		queryName: "in_order",
		shown: false,
		widthClass: 'w0',
		determining: (v) => {
			if (v)
				return true
		}
	}
];

export default computerLabels;
