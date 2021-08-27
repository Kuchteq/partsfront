import { writable } from 'svelte/store';

import PriceField from '$shared/fields/PriceField.svelte';
import SelectField from '$shared/fields/SelectField.svelte';
import DatetimeField from '$shared/fields/SelectField.svelte';

function createSeller() {
	const { subscribe, update } = writable([]);

	const addPart = (id) => {
		update((arr) => {
			if (arr.findIndex((elem) => elem.part_id == id) != -1) {
				return arr;
			}
			arr.push({
				part_id: id,
				sell_price: 2,
				quantity: 2
			});
			return arr;
		});
	};
	const removePart = (id) => {
		update((arr) => {
			let arrIdx = arr.findIndex((elem) => elem.part_id == id);
			console.log(arrIdx);
			arr.splice(arrIdx, 1);
			return arr;
		});
	};

	const updateVal = (id, val, dest) => {
		update((arr) => {
			arr[id][dest] = val;
			arr[id].error = undefined;
			return arr;
		});
	};

	return { subscribe, addPart, removePart, updateVal };
}
export default createSeller;
