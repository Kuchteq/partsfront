<script>
	import TableTopPart from './topPart/TableTopPart.svelte';
	import TableBody from './body/TableBody.svelte';
	import back from '$axios';

	export let labels;
	export let sortHandler;
	export let sortValue;
	export let results;
	export let fetcherFunc;
</script>

<section>
	<TableTopPart {labels} {sortHandler} {sortValue} />
	<TableBody {labels} {results} {fetcherFunc} />
</section>
