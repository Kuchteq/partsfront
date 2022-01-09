import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { _ } from "/config/i18n.js";

const pushStack = writable([]);

let id = 0;
const waitTime = 3000;
const waitToHide = (arr, curId) => {
	if (arr[arr.findIndex((obj) => obj.id === curId)].visible === false) {
		pushStack.update((afterGoneArray) => {
			afterGoneArray[afterGoneArray.findIndex((obj) => obj.id === curId)].display = false;
			return afterGoneArray;
		});
	}
};

function addNotif(type, header, desc, clickAction) {
	pushStack.update((ogArray) => {
		let arr = ogArray.concat([
			{ id, type, header: header, desc, clickAction, visible: true, display: true }
		]);
		const curId = id;
		setTimeout(() => {
			pushStack.update((setToHideArray) => {
				setToHideArray[setToHideArray.findIndex((obj) => obj.id === curId)].visible = false;
				setTimeout(() => {
					waitToHide(setToHideArray, curId);
				}, waitTime);
				return setToHideArray;
			});
		}, waitTime);

		return arr;
	});
	id += 1;
}

function holdLifeTime(id) {
	pushStack.update((arr) => {
		arr[arr.findIndex((obj) => obj.id === id)].visible = true;
		return arr;
	});
}
function resumeKilling(id) {
	setTimeout(() => {
		pushStack.update((arr) => {
			arr[arr.findIndex((obj) => obj.id === id)].visible = false;
			setTimeout(() => {
				waitToHide(arr, id);
			}, waitTime);
			return arr;
		});
	}, waitTime);
}
function killInstantly(id) {
	pushStack.update((arr) => {
		let idx = arr.findIndex((obj) => obj.id === id);
		console.log(id);
		arr[idx].visible = false;
		arr[idx].display = false;
		return arr;
	});
}

let serverError = () => {
	addNotif('error', get(_)('server_error_title'), get(_)('server_error_desc'));

}

export { addNotif, pushStack, holdLifeTime, resumeKilling, killInstantly, serverError };
