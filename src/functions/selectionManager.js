import { writable } from 'svelte/store';

const selectedParts = new writable([]);
let lastDesellection = new writable(undefined);
let lastSelection = new writable(undefined);

function setPartSelection(id) {
	selectedParts.update((old) => {
		let arrIdx = old.findIndex((idx) => idx == id);

		if (arrIdx != -1) {
			old.splice(arrIdx, 1);
			lastDesellection.set(id);
		} else {
			old.push(id);
			lastSelection.set(id);
		}

		return old;
	});
}

function deselectAllParts() {
	lastDesellection.set(undefined);
	lastSelection.set(undefined);
	selectedParts.set([]);
}

export default selectedParts;
export { setPartSelection, deselectAllParts, lastDesellection, lastSelection };
