import { writable, derived, get } from 'svelte/store';
import back from '$axios';

function createFetchClient(labelsToCreate, fetchSource) {
	const labels = writable(labelsToCreate);
	const results = writable([]);
	let past = writable(false);
	let highlighted = writable(-1);

	const fetchPage = (page, sortQuery, sQuery) => {
		return new Promise((resolve, reject) => {
			if (!sortQuery) {
				sortQuery = adjustedInitialQuery();
			}
			back
				.get(fetchSource, {
					params: {
						page: page,
						sort_by: sortQuery.by
							? sortQuery.by
							: labelsToCreate.find((labelsToCreate) => labelsToCreate.default == true).queryName,
						sort_dir: sortQuery.dir ? sortQuery.dir : 'desc',
						s: sQuery ? sQuery : undefined,
						past: get(past)
					}
				})
				.then((res) => {
					results.update((initial) => initial.concat(res.data));

					if (res.data.length < 20) {
						reject('No more inventory');
					} else {
						resolve();
					}
				})
				.catch((err) => {
					console.log(err);
					reject('No more inventory');
				});
		});
	};
	const togglePast = () => {
		past.set(!get(past));
	};
	const fetchRecords = (path, sortQuery, sQuery) => {
		return new Promise((resolve, reject) => {
			if (!sortQuery) {
				sortQuery = adjustedInitialQuery();
			}
			back
				.get(path, {
					params: {
						sort_by: sortQuery.by
							? sortQuery.by
							: labelsToCreate.find((labelsToCreate) => labelsToCreate.default == true).queryName,
						sort_dir: sortQuery.dir ? sortQuery.dir : 'desc',
						s: sQuery ? sQuery : undefined
					}
				})
				.then((res) => {
					results.update((initial) => initial.concat([res.data]));

					resolve();
				})
				.catch((err) => {
					console.log(err);
					reject('No more inventory');
				});
		});
	};
	const adjustedInitialQuery = () => {
		return {
			by: labelsToCreate.find((labelsToCreate) => labelsToCreate.default == true).queryName,
			dir: 'desc'
		};
	};
	return {
		results: derived(results, (bs) => bs),
		labels: derived(labels, (bs) => bs),
		highlighted: derived(highlighted, (bs) => bs),
		togglePast: togglePast,
		past: past,
		fetchPage: fetchPage,
		fetchRecords: fetchRecords,
		sortBy: (sortObj, toByVal, prevObj) => {
			if (!prevObj) {
				prevObj = adjustedInitialQuery();
			}

			sortObj.setObj({
				by: toByVal,
				dir: toByVal !== prevObj.by ? 'desc' : prevObj.dir == 'asc' ? 'desc' : 'asc'
			});
		},
		sortByLocal: (sortObj, toByVal, prevObj) => {
			sortObj.set({
				by: toByVal,
				dir: toByVal !== prevObj.by ? 'desc' : prevObj.dir == 'asc' ? 'desc' : 'asc'
			});
		},

		handleHide: (id) => {
			labels.update((before) => {
				before[id].shown = !before[id].shown;
				highlighted.set(id);

				return before;
			});
		},
		resetResults: () => {
			results.set([]);
		}
	};
}

export default createFetchClient;
