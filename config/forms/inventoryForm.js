import DatetimeField from '$shared/fields/DatetimeField.svelte';
import IntegerField from '$shared/fields/IntegerField.svelte';
import PriceField from '$shared/fields/PriceField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';
// import EmailField from '$shared/fields/EmailField.svelte';
// import PhoneField from '$shared/fields/PhoneField.svelte';
let inventoryForm = [
	{
		label: 'Segment',
		queryName: 'segment_obj',
		component: SelectField,
		fetchString: '/segment-list',
		value: '',
		themeColor: '#006ae5',
		required: true
	},
	{
		label: 'Nazwa/model produktu',
		queryName: 'part_name',
		component: StringField,
		value: '',
		required: true
	},
	{
		label: 'Ilość',
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
		label: 'Cena',
		queryName: 'price',
		component: PriceField,
		quantity: true,
		value: 0,
		required: true
	},
	{
		label: 'Dostawca',
		queryName: 'supplier_obj',
		component: SelectField,
		fetchString: '/supplier-list',
		addHandlerModal: 'suppliersModal',
		value: '',
		themeColor: '#00a4d8',
		required: true
	},
	{
		label: 'Notatka',
		queryName: 'short_note',
		component: StringField,
		value: '',
		required: false
	},

	{
		label: 'Data zakupu',
		queryName: 'purchase_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	}
];

export default inventoryForm;
