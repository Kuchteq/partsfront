import DatetimeField from '$shared/fields/DatetimeField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';
// import EmailField from '$shared/fields/EmailField.svelte';
// import PhoneField from '$shared/fields/PhoneField.svelte';
let problemsForm = [
	{
		label: 'Komputer',
		queryName: 'computer_obj',
		component: SelectField,
		fetchString: '/computer-list',
		value: '',
		themeColor: '#8a00e5',
		required: true
	},
	{
		label: 'Notka o problemie',
		queryName: 'problem_note',
		component: StringField,
		value: '',
		required: true
	},
	{
		label: 'Data oddania',
		queryName: 'hand_in_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	},
	{
		label: 'Deadline',
		queryName: 'deadline_date',
		component: DatetimeField,
		value: '',
		default: '',
		required: false
	}
];

export default problemsForm;
