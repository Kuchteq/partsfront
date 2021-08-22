import { writable, derived, get } from 'svelte/store';

import back from '$axios';

function createPostClient(formStructure) {
	const { subscribe, set, update } = writable(formStructure);

	return {
		subscribe,
		updateVal: (id, val) => {
			update((old) => {
				old[id].value = val;
				return old;
			});
		},
		resetResults: () => {}
	};
}

export default createPostClient;
