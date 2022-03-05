import { writable } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';
import back from '$axios';

const SERVER_ERROR_STRING =
	'Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych';

function createPartSeller() {
	const { subscribe, update, set } = writable([]);

	const synchronize = (itemsIds) => {
		update((arr) => {
			if (itemsIds.length == 0) return [];
			let only_arr = arr.map(({ part_id }) => part_id);
			if (arr.length < itemsIds.length) {
				let diff = itemsIds.filter((x) => !only_arr.includes(x));
				diff.forEach((n) => {
					arr.push({
						part_id: n,
						sell_price: 0,
						quantity: 1,
					});
				});

				//let found = arr.findIndex((elem) => elem.part_id == diff[0]);
				//arr.splice(found, 1);
			} else if (arr.length > itemsIds.length) {
				let diff = only_arr.filter((x) => !itemsIds.includes(x));
				let found = arr.findIndex((elem) => elem.part_id == diff[0]);
				arr.splice(found, 1);
			}

			return arr;
		});
	};

	const addInfo = (part_id, info) => {
		update((arr) => {
			let arr_id = arr.findIndex((elem) => elem.part_id == part_id);
			arr[arr_id].info = info;
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
	const sell = (
		orderInfoJson,
		clientName,
		orderPartChunks,
		orderComputerChunks,
		successMessage
	) => {
		return new Promise((resolve, reject) => {
			if (!orderInfoJson.name)
				orderInfoJson.name = `Sale for ${clientName} on ${orderInfoJson.sell_date} `;
			orderInfoJson.parts = orderPartChunks;
			orderInfoJson.computers = orderComputerChunks;
			back
				.post('/orders', orderInfoJson)
				.then(() => {
					//Notif template
					//let successMessage = {title: ``, desc: ``}
					addNotif('success', successMessage.title, successMessage.desc);

					resolve();
				})
				.catch((err) => {
					addNotif('error', 'Problem po stronie serwera', SERVER_ERROR_STRING);
					reject();
				});
		});
	};
	const modify = (id, orderInfoJson, clientName, orderPartChunks, orderComputerChunks, successMessage) => {
		return new Promise((resolve, reject) => {
			if (!orderInfoJson.name)
				orderInfoJson.name = `Sprzedaż dla ${clientName} w dniu i godzinie ${orderInfoJson.sell_date} `;
			orderInfoJson.parts = orderPartChunks;
			orderInfoJson.computers = orderComputerChunks;
			back
				.put(`/orders/${id}`, orderInfoJson)
				.then(() => {
					//Notif template
					//let successMessage = {title: ``, desc: ``}
					addNotif('success', successMessage.title, successMessage.desc);

					resolve();
				})
				.catch((err) => {
					addNotif('error', 'Problem po stronie serwera', SERVER_ERROR_STRING);
					reject();
				});
		});
	}

	const checkValidity = () => {
		let valid = true;
		update((arr) => {
			arr.forEach((field, i) => {
				if (!field.sell_price) {
					field.error = 1;
					valid = false;
					addNotif('error', 'Niepoprawne dane', `${i + 1} przedmiot nie ma uzupełnionej ceny`);
				}
				if (!field.quantity) {
					field.error = 2;
					valid = false;
					addNotif('error', 'Niepoprawne dane', `${i + 1} przedmiot nie ma uzupełnionej ilości`);
				}
				if (field.quantity > field.info.stock) {
					field.error = 3;
					valid = false;
					addNotif('error', 'Nieprawidłowa ilość', `nie posiadasz wystarczającej ilości przedmiotu ${i + 1} potrzebnego do tej sprzedaży`);
				}
			});
			return arr;
		});
		return valid;
	};
	const resetValues = () => set([]);
	return { synchronize, addInfo, subscribe, updateVal, sell, checkValidity, resetValues, modify };
}
export default createPartSeller;
