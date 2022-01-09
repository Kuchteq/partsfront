import DatetimeField from '$shared/fields/DatetimeField.svelte';
import IntegerField from '$shared/fields/IntegerField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime, checkLength } from '../formatHelpers.js';
import EmailField from '$shared/fields/EmailField.svelte';
import PhoneField from '$shared/fields/PhoneField.svelte';
import { get } from 'svelte/store';

let inventoryForm = [
	{
		label: _ => _('clients.name'),
		queryName: 'client_name',
		component: StringField,
		value: '',
		required: true
	},
	{
		label: _ => _('clients.phone'),
		queryName: 'phone',
		component: PhoneField,
		type: 'phone',
		value: {
			countryCode: '48',
			number: null
		},
		default: {
			countryCode: '48',
			number: null
		},
		constraints: [
			{
				checker: checkLength,
				target: 'number',
				args: [9, true],
				errorDesc: 'Pole numeru telefonu musi posiadać dokładnie 9 cyfr'
			}
		],
		required: false
	},
	{
		label: _ => _('clients.email'),
		queryName: 'email',
		component: EmailField,
		value: '',
		required: false
	},
	{
		label: _ => _('clients.address'),
		queryName: 'adress',
		component: StringField,
		value: '',
		required: false
	},
	{
		label: _ => _('clients.nip'),
		queryName: 'nip',
		component: IntegerField,
		value: '',
		required: false,
		constraints: [
			{
				checker: checkLength,
				args: [10],
				errorDesc: 'Pole nip musi posiadać dokładnie 10 cyfr'
			}
		]
	},
	{
		label: _ => _('clients.note'),
		queryName: 'short_note',
		component: StringField,
		value: '',
		required: false
	},

	{
		label: _ => _('clients.joined_at'),
		queryName: 'join_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	}
];

export default inventoryForm;
