import DatetimeField from '$shared/fields/DatetimeField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import StringField from '$shared/fields/StringField.svelte';
import { getCurrentTime } from '../formatHelpers.js';
import CompleteField from '$lib/completeField/CompleteField.svelte'
let problemsForm = [
	{
		label: _ => _('problems.computer_name'),
		queryName: 'computer_obj',
		component: SelectField,
		fetchString: '/computer-list',
		value: '',
		themeColor: '#8a00e5',
		required: true
	},
	{
		label: _ => _('problems.problem_desc'),
		queryName: 'problem_note',
		component: StringField,
		value: '',
		required: true
	},
	{
		label: _ => _('problems.return_date'),
		queryName: 'hand_in_date',
		component: DatetimeField,
		value: getCurrentTime(),
		default: getCurrentTime(),
		required: true
	},
	{
		label: _ => _('problems.deadline'),
		queryName: 'deadline_date',
		component: DatetimeField,
		value: '',
		default: '',
		required: false
	},
	{
		label: _ => _('problems.status'),
		queryName: 'finished',
		component: CompleteField,
		value: false,
		default: false,
		required: false
	}
];

export default problemsForm;
