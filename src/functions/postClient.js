import { writable } from 'svelte/store';
import { addNotif } from '$functions/PopupClient';
import back from '$axios';
import { get } from 'svelte/store';
import { _ } from '/config/i18n.js';

const checkForConstraints = (field) => {
	//function to check whether some constraints are violated
	let valid;
	field.constraints.every((con, errFunc) => {
		const target = con.target ? field.value[con.target] : field.value;
		if (target && !con.checker(target, ...con.args)) {
			field.error = true;

			addNotif('error', `Pole ${field.label(get(_))} nie spełnia wymagań`, con.errorDesc, errFunc);
			valid = false;
		}
	});
	return valid;
};

const createReqJson = (formStructure) => {
	//function to create json object to send to server in post request body
	let json = {};

	formStructure.forEach(({ queryName, value, type }) => {
		//format value if needed
		if (type == 'phone') {
			json[queryName] = value.number ? value.countryCode + value.number.replace(/\s/g, '') : null;
		} else if (queryName.endsWith('_obj') && value) {
			json[queryName.replace('_obj', '_id')] = value.value ? value.value : null;
		} else if (value === false) {
			json[queryName] = false;
		}
		else {
			json[queryName] = value ? value : null;
		}
	});
	return json;
};

function createPostClient(formStructure, getPath = undefined, updateId = undefined) {
	//main function that takes care of post request validation and sending the data to server
	//with that function you create an object that can be used to post data to server

	/*create store - a special value that stores state of some part of the app.
	Here we create a store that will hold the form structure and the data that is 
	being sent to server*/

	const { subscribe, update } = writable(formStructure);

	/*a function that will be called when the form is submitted and
	when the user clicks on the reset button*/
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
			Object.keys(data).forEach((key) => {
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

	//if the form is being updated, we need to first get the data from server and fill in the fields
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
				console.log(err)
				addNotif(
					'error',
					get(_)('computer_modal.empty_misc_field_title'),
					get(_)('computer_modal.empty_misc_field_msg')
				);
			});
	}

	const resetFromGet = () => {
		if (getData) fillFromGet(getData);
	};

	return {
		subscribe,
		//fumction that is used to update some field in the form
		updateVal: (id, val) => {
			update((old) => {
				old[id].value = val;
				old[id].error = undefined;
				return old;
			});
		},
		//function to check whether the form is valid
		checkValidity: (modalName) => {
			let valid = true;
			update((old) => {
				old.forEach((field, i) => {
					//if some value is required and it is not filled in, set error to true and show it to the user
					if (field.required && !field.value) {
						field.error = true;
						valid = false;
						addNotif('error', 'Niepoprawne dane', `${field.label(get(_))} nie jest uzupełniony/a`, () => {
							document.querySelector(`#modal-${modalName} [data-field-id="${i}"] input`).focus();
						});
					}
					if (field.constraints && field.value) {
						//if some constraints are violated, set error to true and show it to the user
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
		//function to send the data to server
		post: (path, successMessage) => {
			return new Promise((resolve, reject) => {
				//create json object to send to server in post request body
				let postJson = createReqJson(formStructure);
				back
					.post(path, postJson)
					.then(() => {
						//notify user that the data was sent successfully
						addNotif('success', successMessage.title, successMessage.desc);
						resetValues();
						resolve();
					})
					.catch((err) => {
						console.log(err)
						addNotif(
							'error',
							get(_)('computer_modal.empty_misc_field_title'),
							get(_)('computer_modal.empty_misc_field_msg')
						);
						reject();
					});
			});
		},
		createReqJson,
		resetValues,
		//similar to above post function, but it is used to update data on server
		put: (path, updateId, successMessage) => {
			return new Promise((resolve, reject) => {
				let updateJson = createReqJson(formStructure);
				back
					.put(`${path}${updateId}`, updateJson)
					.then(() => {
						addNotif('success', successMessage.title, successMessage.desc);
						resolve();
					})
					.catch((err) => {
						console.log(err)
						addNotif(
							'error',
							get(_)('computer_modal.empty_misc_field_title'),
							get(_)('computer_modal.empty_misc_field_msg')
						);
						reject();
					});
			});
		},
		resetFromGet,
		//makes a request to the server to delete some data
		delete: (path, deleteId, successMessage) => {
			return new Promise((resolve, reject) => {
				let updateJson = createReqJson(formStructure);

				back
					.delete(`${path}${deleteId}`, updateJson)
					.then(() => {
						addNotif('success', successMessage.title, successMessage.desc);
						resolve();
					})
					.catch((err) => {
						console.log(err)
						addNotif(
							'error',
							get(_)('computer_modal.empty_misc_field_title'),
							get(_)('computer_modal.empty_misc_field_msg')
						);
						reject();
					});
			});
		}
	};
}

export default createPostClient;
