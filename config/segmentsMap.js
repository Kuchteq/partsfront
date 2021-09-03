const segmentsMap = [
	{
		value: 1,
		label: 'Procesor'
	},
	{ value: 2, label: 'Karta graficzna' },
	{ value: 3, label: 'Płyta główna' }
];
const segmentsLabels = segmentsMap.map((segment) => segment.label);
export { segmentsLabels };
export default segmentsMap;
