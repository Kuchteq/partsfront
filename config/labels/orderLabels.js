
let problemsLabels = [
	{
		id: 0,
		name: _ => _('orders.id'),
		queryName: 'order_id',
		shown: true,
		widthClass: 'w2',
		default: true
	},
	{
		id: 1,
		name: _ => _('orders.client'),
		queryName: 'client_name',
		shown: true,
		widthClass: 'w7'
	},
	{
		id: 2,
		name: _ => _('orders.order_name'),
		queryName: 'order_name',
		shown: false,
		widthClass: 'w10'
	},
	{
		id: 2,
		name: _ => _('orders.items'),
		queryName: 'parts',
		shown: true,
		widthClass: 'w25'
	},
	{
		id: 3,
		name: _ => _('orders.amount'),
		queryName: 'items_amount',
		shown: true,
		widthClass: 'w3'
	},
	{
		id: 4,
		name: _ => _('orders.value'),
		queryName: 'items_value',
		shown: true,
		widthClass: 'w5'
	},

	{
		id: 6,
		name: _ => _('orders.profit'),
		queryName: 'profit',
		shown: true,
		widthClass: 'w5'
	},
	{
		id: 7,
		name: _ => _('orders.date'),
		queryName: 'sell_date',
		shown: false,
		widthClass: 'w7'
	}
];

export default problemsLabels;
