import DatetimeField from '$shared/fields/DatetimeField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';

let orderForm = [
	{
		label: _ => _('computer_modal.computer_name'),
		queryName: 'computer_name',
		component: StringField,
		value: '',
		required: false,
		placeholder: 'Jeżeli pozostawisz puste nazwa wygeneruje się sama'
	},

	{
		label: _ => _('computer_modal.assembled_at'),
		queryName: 'assembled_at',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	},
	{
		label: _ => _('computer_modal.note'),
		queryName: 'short_note',
		component: StringField,
		value: '',
		required: false
	}
];
export default orderForm;
