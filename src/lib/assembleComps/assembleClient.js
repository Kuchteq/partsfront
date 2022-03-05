import computerForm from './computerPartsForm';
import { writable, get } from 'svelte/store';
import back from '$axios';
import clone from 'just-clone';
import { _ } from "/config/i18n.js";

const initialForm = clone(computerForm);
const mainParts = writable(computerForm);
const miscParts = writable([]);
//const partsData = writable([]);
import { segmentsLabels } from '/config/segmentsMap';
import { addNotif } from '$functions/PopupClient';

const formatGet = (string, values) => string.replace(/{(.*?)}/g, (match, offset) => values[offset]);

const adjustToForm = (arr) => {
	return arr.map((elem) => {
		return {
			label: segmentsLabels[elem.segment_id - 1],
			segment_id: elem.segment_obj.value,
			quantity: elem.quantity ? elem.quantity : 1,
			value: {
				part_id: elem.part_id,
				part_name: elem.part_name,
				price: elem.price
			},
			piece_id: elem.piece_id ? elem.piece_id : undefined
		};
	});
};

const initParts = (data) => {
	mainParts.update((mainForm) => {
		mainForm = clone(initialForm);
		mainForm.forEach((val, i) => {
			let mainPart = data.filter((d) => d.segment_obj.value == val.segment_id)[0];
			if (mainPart) {
				mainForm[i].value = mainPart;
				mainForm[i].piece_id = mainPart.piece_id;
				mainForm[i].quantity = mainPart.quantity ? mainPart.quantity : 1;
			}
		});

		return mainForm;
	});

	miscParts.update(() => {
		let allMisc = [];
		computerForm.forEach((val) => {
			let foundParts = data.filter((d) => d.segment_obj.value == val.segment_id);
			if (foundParts.length > 1) {
				allMisc = allMisc.concat(foundParts.slice(1, foundParts.length));
			}
		});
		//This 5 is very important
		allMisc = allMisc.concat(data.filter(d => [1, 2, 4, 6, 7, 9].findIndex((x) => x == d.segment_obj.value) == -1));

		return adjustToForm(allMisc);
	});
};

const fromSelect = (selectedParts) => {
	back.get(`/inventory-basic/${selectedParts}`).then((res, err) => {
		let r = res.data;

		initParts(r);
	});
};

const fillFromInitial = (updateId) => {
	back
		.get(`/computers/${updateId}`)
		.then((res) => {
			initParts(res.data.parts);
		})
		.catch((err) => {
			console.log(err);
			addNotif('error', get(_)('server_error_title'), get(_)('server_error_desc'));
		});
};

const resetBoth = () => {
	mainParts.set(clone(initialForm));
	miscParts.set([]);
};

const updateMains = (segment, val) => {
	mainParts.update((arr) => {
		let elem = arr[segment];

		if (val == null) {
			delete elem.value;
		} else
			elem.value = {
				part_id: val.value,
				part_name: val.label,
				price: val.price,
				stock: val.stock
			};
		elem.quantity = 1;
		return arr;
	});
};

const updateMiscs = (place, val, segment_id) => {
	miscParts.update((arr) => {
		let elem = arr[place];
		if (val == null) {
			delete elem.value;
		} else
			elem.value = {
				part_id: val.value,
				part_name: val.label,
				price: val.price,
				stock: val.stock
			};
		elem.segment_id = segment_id;
		elem.label = segmentsLabels[segment_id - 1];
		elem.quantity = 1;
		return arr;
	});
};

const removeMiscPart = (place) => {
	miscParts.update((arr) => {
		arr.splice(place, 1);
		return arr;
	});
};

const removeMainPart = (place) => {
	mainParts.update((arr) => {
		let indx = arr.findIndex((elem) => elem.segment_id == place);
		arr[indx].value = undefined;
		arr[indx].quantity = undefined;
		return arr;
	});
};
const addPart = () => {
	miscParts.update((arr) => {
		arr.push({
			label: undefined,
			segment_id: 0,
			quantity: 1
		});
		return arr;
	});
};
const updateQuantity = (e, place, isMisc) => {
	if (e.target.value < 1) {
		e.target.value = 1;
	}
	const toUpdate = isMisc ? miscParts : mainParts;
	toUpdate.update((arr) => {
		if (arr[place].value.stock < e.target.value) e.target.value = arr[place].value.stock;
		arr[place].quantity = e.target.value;
		return arr;
	});
};

const getPseudoRandomSequnece = (date) => {
	return (
		date.substring(5, 7) +
		date.substring(14, 16) +
		date.substring(11, 13) +
		(Math.random() + 1).toString(36).substring(2) +
		date.substring(7, 10)
	);
};

const makeComputer = (basicInfo) => {
	return new Promise((resolve, reject) => {
		let computerPieces = [];
		let randomisedName = 'k';

		computerPieces = []
			.concat(get(mainParts), get(miscParts))
			.filter((val) => val.value)
			.map((part, i) => {
				if (i < 2) randomisedName += part.value.part_name.substring(0, 8);
				return { part_id: part.value.part_id, quantity: part.quantity };
			});
		if (!basicInfo.computer_name)
			basicInfo.computer_name = (
				randomisedName + getPseudoRandomSequnece(basicInfo.assembled_at)
			).replaceAll(' ', '');
		back
			.post('/computers', { ...basicInfo, pieces: computerPieces })
			.then(() => {
				addNotif(
					'success',
					get(_)('popup_msg.set_added_title'),
					formatGet((get(_)('popup_msg.set_added_msg')), { name: basicInfo.computer_name })
				);
				resolve();
			})
			.catch(() => {
				addNotif('error', get(_)('server_error_title'), get(_)('server_error_desc'));
				reject();
			});
	});
};

const updateComputer = (basicInfo, computer_id) => {
	return new Promise((resolve, reject) => {
		let computerPieces = [];
		let randomisedName = 'k';

		computerPieces = []
			.concat(get(mainParts), get(miscParts))
			.filter((val) => val.value)
			.map((part, i) => {
				if (i < 2) randomisedName += part.value.part_name.substring(0, 8);
				return { piece_id: part.piece_id, part_id: part.value.part_id, quantity: part.quantity };
			});
		if (!basicInfo.computer_name)
			basicInfo.computer_name = (
				randomisedName + getPseudoRandomSequnece(basicInfo.assembled_at)
			).replaceAll(' ', '');
		back
			.put(`/computers/${computer_id}`, { ...basicInfo, pieces: computerPieces })
			.then(() => {
				addNotif(
					'success',
					get(_)('popup_msg.set_modified_title'),
					formatGet((get(_)('popup_msg.set_modified_msg')), { name: basicInfo.computer_name })
				);
				resolve();
			})
			.catch(() => {
				addNotif('error', get(_)('server_error_title'), get(_)('server_error_desc'));
				reject();
			});
	});
};

const validateComputer = () => {
	//problem codes
	//0 - everything okay
	//1 - Misc parts are added but their value is blank, it won't let you pass
	//2 - There are no parts at all, it won't let you pass
	//3 - Some of the main parts are not present but you can continue by confirming your decision,
	//it is also the code where there are no main parts at all but some misc parts
	const miParts = get(miscParts);
	for (let i = 0; i < miParts.length; i++) {
		if (!miParts[i].value) {
			addNotif(
				'error',
				get(_)('computer_modal.empty_misc_field_title'),
				get(_)('computer_modal.empty_misc_field_msg')
			);
			return 1;
		}
	}
	if ([].concat(get(mainParts), get(miscParts)).filter((val) => val.value).length < 1) {
		addNotif(
			'error',
			get(_)('computer_modal.no_parts_title'),
			get(_)('computer_modal.no_parts_desc')
		);
		return 2;
	}

	const maParts = get(mainParts);
	for (let i = 0; i < maParts.length; i++) {
		if (!maParts[i].value) {
			return 3;
		}
	}
	return 0;
};

export {
	fromSelect,
	resetBoth,
	mainParts,
	miscParts,
	updateMains,
	makeComputer,
	updateComputer,
	validateComputer,
	updateMiscs,
	removeMainPart,
	removeMiscPart,
	addPart,
	updateQuantity,
	fillFromInitial
};
