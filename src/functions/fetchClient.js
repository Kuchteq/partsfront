import { writable, derived, get } from 'svelte/store';

import back from '$axios';
import { refetch } from './triggerRefetch';

function createFetchClient(labelsToCreate, fetchSource) {
	const labels = writable(labelsToCreate);
	const results = writable([]);

	const sortValue = writable({
		by: labelsToCreate.find((labelsToCreate) => labelsToCreate.default == true).queryName,
		dir: 'desc'
	});

	const fetchInventory = (page) => {
		return new Promise((resolve, reject) => {
			back
				.get(fetchSource, {
					params: {
						page: page,
						sort_by: get(sortValue).by,
						sort_dir: get(sortValue).dir
					}
				})
				.then((res) => {
					results.update((initial) => initial.concat(res.data));
					if (res.data.length === 0) {
						reject('No more inventory');
					}

					resolve();
				})
				.catch((err) => {});
		});
	};
	return {
		results: derived(results, (bs) => bs),
		labels: derived(labels, (bs) => bs),
		sortValue: derived(sortValue, (bs) => bs),
		addResults: () => {
			results.update((old) => {
				return old.concat([{ tenresult: 'ruudas' }]);
			});
		},
		fetchInventory: fetchInventory,
		sortBy: (by) => {
			sortValue.update((cur) => {
				return {
					by: by,
					dir: by !== cur.by ? 'asc' : cur.dir == 'asc' ? 'desc' : 'asc'
				};
			});
			refetch();
		},
		handleHide: (id) => {
			labels.update((before) => {
				before[id].shown = !before[id].shown;
				return before;
			});
		},
		resetResults: () => {
			results.set([]);
		}
	};
}

export default createFetchClient;
