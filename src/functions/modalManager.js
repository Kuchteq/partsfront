import { writable, derived, get } from 'svelte/store';

const modalsOpenState = new writable({
	add: false,
	sell: false,
	assemble: false,
	raports: false,
	clients: false,
	suppliers: false,
	problems: false
});

function openModal(modal) {
	modalsOpenState.update((old) => {
		old[modal] = true;
		return old;
	});
}
function closeModal(modal) {
	modalsOpenState.update((old) => {
		old[modal] = false;
		return old;
	});
}

export { modalsOpenState, openModal, closeModal };
