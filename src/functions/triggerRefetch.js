import { writable } from 'svelte/store';

const refetchStatus = writable(0);

const refetch = () => {
	refetchStatus.update((v) => (v += 1));
};

export default refetchStatus;
export { refetch };
