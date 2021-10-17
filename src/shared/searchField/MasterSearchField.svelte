<script>
	import back from '$axios';
	import PartsFormat from './formatting/PartsFormat.svelte';
	import ComputersFormat from './formatting/ComputersFormat.svelte';
	import SubSearchArea from './SubSearchArea.svelte';
	import ClientsFormat from './formatting/ClientsFormat.svelte';
	import SuppliersFormat from './formatting/SuppliersFormat.svelte';
	import ProblemsFormat from './formatting/ProblemsFormat.svelte';

	let query = '';
	let focused = false;
	let hovering = false;
	let shown = false;
	let anyResults = false;

	$: {
		if (focused && query.length > 1) {
			shown = true;
		} else if (hovering && query.length > 1) {
			shown = true;
		} else {
			shown = false;
		}
	}
	const modules = {
		parts: {
			header: 'Inwentarz',
			color: 'var(--mBlue)',
			data: [],
			format: PartsFormat
		},
		computers: {
			header: 'Komputery',
			color: 'var(--mPurple)',
			data: [],
			format: ComputersFormat
		},
		clients: {
			header: 'Klienci',
			color: 'var(--mClients)',
			data: [],
			format: ClientsFormat
		},
		suppliers: {
			header: 'Dostawcy',
			color: 'var(--mSuppliers)',
			data: [],
			format: SuppliersFormat
		},
		problems: {
			header: 'Problemy',
			color: 'var(--mOrange)',
			data: [],
			format: ProblemsFormat
		}
	};
	const fetchResults = (val) => {
		query = val;
		if (query.length > 1) {
			back
				.get('/multisearch/', {
					params: {
						q: query,
						across: ['parts', 'computers', 'clients', 'suppliers', 'problems']
					}
				})
				.then((qResults) => {
					anyResults = false;
					qResults.data.forEach((moduleData, i) => {
						modules[Object.keys(modules)[i]].data = moduleData;
						if (moduleData.length > 0) {
							anyResults = true;
						}
					});
					console.log(modules);
				});
		}
	};
</script>

<header>
	<input
		class="masterSearchBar {shown ? 'roundedDown' : ''}"
		type="text"
		placeholder="Szukaj w bazie"
		on:input={(e) => fetchResults(e.target.value)}
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
	/>
	<div
		class="outputWindow {shown ? 'shown' : ''}"
		on:mouseleave={() => (hovering = false)}
		on:mouseenter={() => (hovering = true)}
	>
		{#if anyResults == false}<h4>Brak wyników</h4>
		{:else}
			{#each Object.values(modules) as module}
				{#if module.data.length > 0}
					<SubSearchArea
						header={module.header}
						color={module.color}
						format={module.format}
						results={module.data}
					/>
				{/if}
			{/each}
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		position: relative;
	}
	input {
		width: 100%;
		box-shadow: var(--nShadow);
		border-radius: 26px;
		position: relative;
		background-image: url('/icons/Search.svg');
		background-position: 15px;
		background-size: 30px;
		background-repeat: no-repeat;
		font-weight: 400;
		box-sizing: border-box;
		font-size: 22px;
		padding: 12px 16px 12px 60px;
		transition: var(--sTrans);
	}
	.roundedDown {
		border-radius: 26px 26px 8px 8px;
	}
	.outputWindow {
		position: absolute;
		background-color: #f6f6f6;
		box-shadow: 0px 2px 16px #00000033;
		width: 103%;
		border-radius: 13px;
		top: 70px;
		left: -1.5%;
		opacity: 0;
		visibility: hidden;
		transition: var(--sTrans);
		max-height: 52vh;
		overflow: auto;
		padding-bottom: 20px;
	}
	.shown {
		opacity: 1;
		visibility: visible;
	}
	h4 {
		text-align: center;
		padding: 10px;
		margin: 10px;
		border-top: 1px solid #000;
		border-bottom: 1px solid #000;
	}
</style>
