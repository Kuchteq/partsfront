import DatetimeField from '$shared/fields/DatetimeField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';

let orderForm = [
	{
		label: 'Tytuł sprzedaży',
		queryName: 'name',
		component: StringField,
		value: '',
		required: false,
		placeholder: 'Jeżeli pozostawisz puste nazwa wygeneruje się sama'
	},
	{
		label: 'Klient',
		queryName: 'client_id',
		component: SelectField,
		fetchString: '/client-list',
		addHandlerModal: 'clientsModal',
		value: '',
		themeColor: '#00ae9c',
		required: true
	},
	{
		label: 'Data sprzedaży',
		queryName: 'sell_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	}
];
export default orderForm;
