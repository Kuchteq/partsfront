import DatetimeField from '$shared/fields/DatetimeField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';

let orderForm = [
	{
		label: 'Nazwa komputera',
		queryName: 'computer_name',
		component: StringField,
		value: '',
		required: false,
		placeholder: 'Jeżeli pozostawisz puste nazwa wygeneruje się sama'
	},

	{
		label: 'Złożono',
		queryName: 'assembled_at',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	},
	{
		label: 'Krótka notka',
		queryName: 'short_note',
		component: StringField,
		value: '',
		required: false
	}
];
export default orderForm;
