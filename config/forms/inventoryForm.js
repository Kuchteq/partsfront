import DatetimeField from '$shared/fields/DatetimeField.svelte';
import IntegerField from '$shared/fields/IntegerField.svelte';
import PriceField from '$shared/fields/PriceField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';
let inventoryForm = [
	{
		label: _ => _('inventory.segment'),
		queryName: 'segment_obj',
		component: SelectField,
		fetchString: '/segment-list',
		value: '',
		themeColor: '#006ae5',
		required: true
	},
	{
		label: _ => _('inventory.name_model'),
		queryName: 'part_name',
		component: StringField,
		value: '',
		required: true
	},
	{
		label: _ => _('inventory.stock'),
		queryName: 'stock',
		component: IntegerField,
		boundries: {
			min: 0,
			max: 1000
		},
		value: 0,
		required: true
	},
	{
		label: _ => _('inventory.price'),
		queryName: 'price',
		component: PriceField,
		quantity: true,
		value: 0,
		required: true
	},
	{
		label: _ => _('inventory.supplier'),
		queryName: 'supplier_obj',
		component: SelectField,
		fetchString: '/supplier-list',
		addHandlerModal: 'suppliersModal',
		value: '',
		themeColor: '#00a4d8',
		required: true
	},
	{
		label: _ => _('inventory.note'),
		queryName: 'short_note',
		component: StringField,
		value: '',
		required: false
	},

	{
		label: _ => _('inventory.purchase_date'),
		queryName: 'purchase_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	}
];

export default inventoryForm;
