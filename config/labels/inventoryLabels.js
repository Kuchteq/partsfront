let inventoryLabels = [
	{
		id: 0,
		name: 'id',
		queryName: 'part_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: 'Segment',
		queryName: 'segment_id',
		shown: true,
		widthClass: 'w15'
	},
	{
		id: 2,
		name: 'Nazwa/model produktu',
		queryName: 'part_name',
		shown: true,
		widthClass: 'w40'
	},
	{
		id: 3,
		name: 'Ilość',
		queryName: 'stock',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 4,
		name: 'Cena',
		queryName: 'price',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 5,
		name: 'Notatka',
		queryName: 'short_note',
		shown: false,
		sortedBy: 'asc',
		widthClass: 'w10'
	},
	{
		id: 6,
		name: 'Dostawca',
		queryName: 'supplier_id',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: 'Data zakupu',
		queryName: 'purchase_date',
		shown: true,
		widthClass: 'w10'
	}
];

export default inventoryLabels;
