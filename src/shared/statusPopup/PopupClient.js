import { writable } from 'svelte/store';

const pushStack = writable([]);

let id = 0;

const waitToHide = (arr, curId) => {
	if (arr[arr.findIndex((obj) => obj.id === curId)].visible === false) {
		pushStack.update((afterGoneArray) => {
			afterGoneArray[afterGoneArray.findIndex((obj) => obj.id === curId)].display = false;
			return afterGoneArray;
		});
	}
};

function addNotif(type, header, desc) {
	pushStack.update((ogArray) => {
		let arr = ogArray.concat([{ id, type, header: header, desc, visible: true, display: true }]);
		const curId = id;
		setTimeout(() => {
			pushStack.update((setToHideArray) => {
				setToHideArray[setToHideArray.findIndex((obj) => obj.id === curId)].visible = false;
				setTimeout(() => {
					waitToHide(setToHideArray, curId);
				}, 3000);
				return setToHideArray;
			});
		}, 3000);

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
			}, 3000);
			return arr;
		});
	}, 3000);
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
export { addNotif, pushStack, holdLifeTime, resumeKilling, killInstantly };
