<script>
	import Select from 'svelte-select';
	export let label;
	export let themeColor = '#505050';
	export let addHandler = '';
	let value = { value: 'cake', label: 'Cake' };
	let items = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'pizza', label: 'Pizza' },
		{ value: 'cake', label: 'Cake' },
		{ value: 'chips', label: 'Chips' },
		{ value: 'ice-cream', label: 'Ice Cream' }
	];

	function handleSelect(event) {
		console.log('selected item', event.detail);
		// .. do something here 🙂
	}
</script>

<div class={'uniField'} style="--themeColor:{themeColor}">
	<label>{label}</label>
	<div class="inputsWrap">
		<Select
			{items}
			placeholder={'Wybierz...'}
			{value}
			containerClasses={'customContainer'}
			on:select={handleSelect}
		/>
		{#if addHandler != ''}
			<button class="add"> Lub stwórz nowego + </button>
		{/if}
	</div>
</div>

<style lang="scss">
	.inputsWrap {
		width: calc(82% + 34px);
		display: flex;
		align-items: center;
		:global(.customContainer) {
			border-color: var(--themeColor);
			--borderFocusColor: var(--themeColor);
			padding: 15px;
			width: 500px;
			margin-left: 20px;
			:global(.selectedItem) {
				height: unset;
			}
		}
	}
	.add {
		margin-left: 20px;
		padding: 8px 14px;
		border: 1px solid #505050;
		background-color: var(--themeColor);
		color: #fff;
		font-size: 17px;
		border-radius: 3px;
	}
</style>
