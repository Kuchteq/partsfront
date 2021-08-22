let inventoryForm = [
	{
		label: 'Segment',
		queryName: 'segment_id',
		type: 'select',
		fetchString: '',
		value: ''
	},
	{
		label: 'Nazwa/model produktu',
		queryName: 'part_name',
		type: 'string',
		value: ''
	},
	{
		label: 'Ilość',
		queryName: 'stock',
		type: 'integer',
		value: ''
	},
	{
		label: 'Cena',
		queryName: 'price',
		type: 'price',
		value: ''
	},
	{
		label: 'Dostawca',
		queryName: 'supplier_id',
		type: 'selectAdd',
		fetchString: '',
		addHandler: '',
		value: ''
	},
	{
		label: 'Notatka',
		queryName: 'short_note',
		type: 'string',
		value: ''
	},

	{
		label: 'Data zakupu',
		queryName: 'purchase_date',
		type: 'date',
		value: ''
	}
];

export default inventoryForm;
