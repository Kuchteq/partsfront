import { writable, derived, get } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';
import clone from 'just-clone';
import back from '$axios';

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

function createPostClient(formStructure) {
	const { subscribe, set, update } = writable(formStructure);

	const resetValues = () => {
		update((arr) => {
			arr.forEach((val, i) => {
				arr[i].value = val.default ? val.default : '';
			});

			return arr;
		});
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
			let postJson = {};

			formStructure.forEach(({ queryName, value, type }) => {
				if (type == 'phone') {
					postJson[queryName] = value.number
						? value.countryCode + value.number.replace(/\s/g, '')
						: null;
				} else if (typeof value == 'object') {
					postJson[queryName] = value.value ? value.value : null;
				} else {
					postJson[queryName] = value ? value : null;
				}
			});
			console.log(postJson);
			back
				.post(path, postJson)
				.then(() => {
					//Notif template
					//let successMessage = {title: ``, desc: ``}
					addNotif('success', successMessage.title, successMessage.desc);
					resetValues();
				})
				.catch((err) => {
					addNotif(
						'error',
						'Problem po stronie serwera',
						`Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych`
					);
				});
		},
		resetValues
	};
}

export default createPostClient;
