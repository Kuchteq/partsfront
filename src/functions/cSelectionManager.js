import { writable } from 'svelte/store';

const selectedComputers = new writable([]);
let lastcDesellection = new writable(undefined);
let lastcSelection = new writable(undefined);

function setComputerSelection(id) {
	selectedComputers.update((old) => {
		let arrIdx = old.findIndex((idx) => idx == id);

		if (arrIdx != -1) {
			old.splice(arrIdx, 1);
			lastcDesellection.set(id);
		} else {
			old.push(id);
			lastcSelection.set(id);
		}
		return old;
	});
}

function deselectAllComputers() {
	lastcDesellection.set(undefined);
	lastcSelection.set(undefined);

	selectedComputers.set([]);
}

export default selectedComputers;
export { setComputerSelection, deselectAllComputers, lastcDesellection, lastcSelection };
