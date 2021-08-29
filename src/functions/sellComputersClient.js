import { writable } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';

function createComputerSeller() {
	const { subscribe, update, set } = writable([]);

	const synchronize = (itemsIds) => {
		update((arr) => {
			if (itemsIds.length == 0) return [];
			itemsIds.forEach((id) => {
				let found = arr.findIndex((elem) => elem.computer_id == id);

				if (found == -1 && arr.length < itemsIds.length) {
					arr.push({
						computer_id: id,
						sell_price: 0,
						quantity: 1
					});
				} else if (found != -1 && arr.length > itemsIds.length) {
					arr.splice(found, 1);
				}
			});

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

	const checkValidity = () => {
		let valid = true;
		update((arr) => {
			arr.forEach((field, i) => {
				if (!field.sell_price) {
					field.error = 1;
					valid = false;
					addNotif('error', 'Niepoprawne dane', `Komputer ${i + 1}  nie ma uzupełnionej ceny`);
				}
			});
			return arr;
		});
		return valid;
	};
	const resetValues = () => set([]);
	return { subscribe, synchronize, updateVal, checkValidity, resetValues };
}
export default createComputerSeller;
