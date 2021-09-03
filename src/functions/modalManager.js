import { writable } from 'svelte/store';

const modalsState = new writable({
	//normal modals
	add: false,
	sell: false,
	assemble: false,
	raports: false,
	clients: false,
	suppliers: false,
	problems: false,
	//modals to preview and update data
	inventoryUpdate: false,
	clientsUpdate: false,
	suppliersUpdate: false,
	computersUpdate: false
});

function openModal(modal, val = true) {
	modalsState.update((old) => {
		old[modal] = val;
		return old;
	});
}
function closeModal(modal) {
	modalsState.update((old) => {
		old[modal] = false;
		return old;
	});
}
export default modalsState;
export { openModal, closeModal };
