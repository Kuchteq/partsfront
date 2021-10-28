const segmentsMap = [
	{
		value: 1,
		label: 'Procesor'
	},
	{ value: 2, label: 'Karta graficzna' },
	{ value: 3, label: 'Płyta główna' },
	{ value: 4, label: 'RAM' },
	{ value: 5, label: 'Monitor' }
];
const segmentsLabels = segmentsMap.map((segment) => segment.label);
export { segmentsLabels };
export default segmentsMap;
