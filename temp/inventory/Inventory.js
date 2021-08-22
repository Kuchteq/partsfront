// import React from 'react';

// export default function Inventory() {
// 	let [selectedItems, setSelectedItems] = useContext();
// 	let [inventoryModalData, setInventoryModalData] = useState();

// 	const constructQuery = () => {
// 		console.log('doing the search based on', labels, searchQuery);
// 	};
// 	const [labels, setLabels] = useState([
// 		{
// 			name: 'Segment',
// 			queryName: 'segment',
// 			shown: true,
// 			sortedBy: true,
// 			widthClass: '40w'
// 		},
// 		{
// 			name: 'Nazwa/model produktu',
// 			queryName: 'product-model',
// 			shown: true,
// 			sortedBy: false,
// 			widthClass: '20w'
// 		}
// 	]);

// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [resultsData, setResultsData] = useState(() => constructQuery());
// 	('Results would look something like this');

// 	let results = [
// 		{
// 			segment: 'Karta Graficzna',
// 			partName: 'Gigabyt Płyta główna coś tam coś tam',
// 			quantity: 6,
// 			nettoPrice: 2600,
// 			value: this.quantity * this.nettoPrice,
// 			dataZakupu: Date,
// 			dostawca: 'ks edmunt'
// 		},
// 		{
// 			segment: 'Karta asfa',
// 			partName: 'Gigabyt Płyta główna coś tam coś tam',
// 			quantity: 6,
// 			nettoPrice: 2600,
// 			value: this.quantity * this.nettoPrice,
// 			dataZakupu: Date,
// 			dostawca: 'ks edmunt'
// 		}
// 	];

// 	useEffect(() => {
// 		constructQuery();
// 	}, [labels]);

// 	useEffect(() => {
// 		constructQuery();
// 	}, [searchQuery]);

// 	const onSingleClick = (e) => {
// 		setSelectedItems(e);
// 	};

// 	const onDoubleClick = (e) => {
// 		setInventoryModalData({ someData });
// 	};

// 	return (
// 		<div>
// 			<AddInventoryButton />
// 			<SellInventoryButton />
// 			<AssembleComputerButton />
// 			<ShowFields labels={labels} />
// 			<SearchField setSearchQuery={setSearchQuery} />
// 			<DeleteButton />

// 			<TableTopPart labels={labels} />
// 			<TableBody resutls={resultsData} labels={labels} />
// 			{inventoryModalData && <InventoryItemModal data={inventoryModalData} />}
// 		</div>
// 	);
// }
