import { writable, derived, get } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';
import clone from 'just-clone';
import back from '$axios';

function createPostClient(formStructure) {
	const initialFormStructure = clone(formStructure);
	const { subscribe, set, update } = writable(formStructure);

	const resetResults = () => {
		set(clone(initialFormStructure));
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
						addNotif('error', 'Niepoprawne dane', `${field.label} nie jest uzupełniony`, () => {
							document.querySelector(`#modal-${modalName} [data-field-id="${i}"] input`).focus();
						});
					}
				});
				return old;
			});
			return valid;
		},
		post: (path, successMessage) => {
			let postJson = {};

			formStructure.forEach(({ queryName, value }) => {
				if (typeof value == 'object') {
					postJson[queryName] = value.value;
				} else {
					postJson[queryName] = value;
				}
			});

			back
				.post(path, postJson)
				.then(() => {
					//Notif template
					//let successMessage = {title: ``, desc: ``}
					addNotif('success', successMessage.title, successMessage.desc);
					resetResults();
				})
				.catch((err) => {
					addNotif(
						'error',
						'Problem po stronie serwera',
						`Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych`
					);
				});

			resetResults();
		}
	};
}

export default createPostClient;
