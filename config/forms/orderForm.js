import DatetimeField from '$shared/fields/DatetimeField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';

let orderForm = [
	{
		label: _ => _('orders.order_name'),
		queryName: 'name',
		component: StringField,
		value: '',
		required: false,
		placeholder: 'Jeżeli pozostawisz puste nazwa wygeneruje się sama'
	},
	{
		label: _ => _('orders.client'),
		queryName: 'client_obj',
		component: SelectField,
		fetchString: '/client-list',
		addHandlerModal: 'clientsModal',
		value: '',
		themeColor: '#00ae9c',
		required: true
	},
	{
		label: _ => _('orders.date'),
		queryName: 'sell_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	}
];
export default orderForm;
