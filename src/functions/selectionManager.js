import { writable } from 'svelte/store';

const selectedParts = new writable([]);

function setSelection(id) {
	selectedParts.update((old) => {
		let arrIdx = old.findIndex((idx) => idx == id);

		if (arrIdx != -1) {
			old.splice(arrIdx, 1);
		} else {
			old.push(id);
		}
		return old;
	});
}
function deselectAll() {
	selectedParts.set([]);
}
export default selectedParts;
export { selectedParts, setSelection, deselectAll };
