
let inventoryLabels = [
	{
		id: 0,
		name: _ => _('inventory.id'),
		queryName: 'part_id',
		shown: true,
		widthClass: 'w5',
		default: true
	},
	{
		id: 1,
		name: _ => _('inventory.segment'),
		queryName: 'segment_id',
		shown: true,
		widthClass: 'w15'
	},
	{
		id: 2,
		name: _ => _('inventory.name_model'),
		queryName: 'part_name',
		shown: true,
		widthClass: 'w30'
	},
	{
		id: 3,
		name: _ => _('inventory.stock'),
		queryName: 'stock',
		shown: true,
		widthClass: 'w3',
		determining: (v) => {
			if (v <= 0) {
				return true;
			}
			return false
		}
	},
	{
		id: 4,
		name: _ => _('inventory.price'),
		queryName: 'price',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 5,
		name: _ => _('inventory.note'),
		queryName: 'short_note',
		shown: false,
		sortedBy: 'asc',
		widthClass: 'w10'
	},
	{
		id: 6,
		name: _ => _('inventory.supplier'),
		queryName: 'supplier_id',
		shown: true,
		widthClass: 'w10'
	},
	{
		id: 7,
		name: _ => _('inventory.suggested_price'),
		queryName: 'suggested_price',
		shown: false,
		widthClass: 'w5'
	},
	{
		id: 8,
		name: _ => _('inventory.purchase_date'),
		queryName: 'purchase_date',
		shown: true,
		widthClass: 'w8'
	}
];

export default inventoryLabels;
