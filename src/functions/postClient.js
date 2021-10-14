import { writable, derived, get } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';
import clone from 'just-clone';
import back from '$axios';

const SERVER_ERROR_STRING =
	'Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych';

const checkForConstraints = (field) => {
	let valid;
	field.constraints.every((con, errFunc) => {
		const target = con.target ? field.value[con.target] : field.value;
		if (target && !con.checker(target, ...con.args)) {
			field.error = true;

			addNotif('error', `Pole ${field.label} nie spełnia wymagań`, con.errorDesc, errFunc);
			valid = false;
		}
	});
	return valid;
};

const createReqJson = (formStructure) => {
	let json = {};

	formStructure.forEach(({ queryName, value, type }) => {
		if (type == 'phone') {
			json[queryName] = value.number ? value.countryCode + value.number.replace(/\s/g, '') : null;
		} else if (queryName.endsWith('_obj') && value) {
			json[queryName.replace('_obj', '_id')] = value.value ? value.value : null;
		} else {
			json[queryName] = value ? value : null;
		}
	});
	return json;
};

function createPostClient(formStructure, getPath = undefined, updateId = undefined) {
	const resetValues = () => {
		update((arr) => {
			arr.forEach((val, i) => {
				arr[i].value = val.default ? val.default : '';
			});

			return arr;
		});
	};
	const fillFromGet = (data) => {
		update((arr) => {
			Object.keys(data).forEach((key, i) => {
				let idx = arr.findIndex((obj) => obj.queryName === key);

				// console.log(arr.find((obj) => obj.queryName === key));
				if (idx != -1 && data[key]) {
					if (key == 'phone') {
						let ph = {
							number: data[key].toString().slice(-9),
							countryCode: data[key].toString().slice(0, -9)
						};
						arr[idx].value = ph;
					} else arr[idx].value = data[key];
				}
			});

			return arr;
		});
	};

	const { subscribe, set, update } = writable(formStructure);
	let getData;

	if (updateId && getPath) {
		resetValues();

		back
			.get(`${getPath}${updateId}`)
			.then((res) => {
				getData = res.data;

				fillFromGet(getData);
			})
			.catch((err) => {
				addNotif('error', 'Problem z pobieraniem po stronie serwera', SERVER_ERROR_STRING);
			});
	}

	const resetFromGet = () => {
		if (getData) fillFromGet(getData);
	};

	return {
		subscribe,
		updateVal: (id, val) => {
			update((old) => {
				old[id].value = val;
				old[id].error = undefined;
				return old;
			});
		},
		checkValidity: (modalName) => {
			let valid = true;
			update((old) => {
				old.forEach((field, i) => {
					if (field.required && !field.value) {
						field.error = true;
						valid = false;
						addNotif('error', 'Niepoprawne dane', `${field.label} nie jest uzupełniony/a`, () => {
							document.querySelector(`#modal-${modalName} [data-field-id="${i}"] input`).focus();
						});
					}
					if (field.constraints && field.value) {
						let localValid = checkForConstraints(field, () => {
							document.querySelector(`#modal-${modalName} [data-field-id="${i}"] input`).focus();
						});

						if (localValid == false) {
							valid = false;
						}
					}
				});
				return old;
			});
			return valid;
		},
		post: (path, successMessage) => {
			return new Promise((resolve, reject) => {
				let postJson = createReqJson(formStructure);

				back
					.post(path, postJson)
					.then(() => {
						//Notif template
						//let successMessage = {title: ``, desc: ``}
						addNotif('success', successMessage.title, successMessage.desc);
						resetValues();
						resolve();
					})
					.catch((err) => {
						addNotif('error', 'Problem po stronie serwera', SERVER_ERROR_STRING);
						reject();
					});
			});
		},
		createReqJson,
		resetValues,
		put: (path, updateId, successMessage) => {
			return new Promise((resolve, reject) => {
				let updateJson = createReqJson(formStructure);

				back
					.put(`${path}${updateId}`, updateJson)
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
		},
		resetFromGet,
		delete: (path, deleteId, successMessage) => {
			return new Promise((resolve, reject) => {
				let updateJson = createReqJson(formStructure);

				back
					.delete(`${path}${deleteId}`, updateJson)
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
	};
}

export default createPostClient;
