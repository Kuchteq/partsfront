//Credits to @bradpphelan of github - https://github.com/sveltejs/kit/issues/969

import { goto } from '$app/navigation';

import { page } from '$app/stores';
import { get } from 'svelte/store';

function queryToObject(params) {
	// parse query string
	const obj = {};
	// iterate over all keys
	for (const key of params.keys()) {
		if (params.getAll(key).length > 1) {
			obj[key] = params.getAll(key);
		} else {
			obj[key] = params.get(key);
		}
	}
	return obj;
}

export function createQueryStore(prop) {
	var query = undefined;

	return {
		subscribe: (h) => {
			return page.subscribe((p) => {
				query = queryToObject(p.query);
				if (prop == 'sort') {
					h({ by: query['by'], dir: query['dir'] });
				} else {
					h(query[prop]);
				}
			});
		},
		set: (v) => {
			query[prop] = v;
			const urlSearchParams = new URLSearchParams(query);
			const g = `?${urlSearchParams.toString()}`;
			goto(g, { keepfocus: true, replaceState: true, noscroll: true });
		},
		setObj: (v) => {
			query['by'] = v.by;
			query['dir'] = v.dir;

			const urlSearchParams = new URLSearchParams(query);
			const g = `?${urlSearchParams.toString()}`;

			goto(g, { keepfocus: true, replaceState: true, noscroll: true });
		}
	};
}
