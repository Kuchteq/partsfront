<script>
	import { onMount } from 'svelte';
	import back from '$axios';
	import { openModal } from '$functions/modalManager.js';
	import Select from 'svelte-select';
	export let id;
	export let label;
	export let update;
	export let initValue = '';
	export let themeColor = '#505050';
	export let addHandlerModal = '';
	export let fetchString;
	export let error = undefined;
	export let required = true;
	let items;
	let innerInitValue;

	function handleSelect(event) {
		update(id, event.detail);
	}
	onMount(() => {
		back
			.get(fetchString)
			.then((res) => {
				items = res.data;
				if (initValue.label === initValue.value) {
					innerInitValue = items.find((item) => initValue.value == item.value);
					update(id, innerInitValue);
				}
			})
			.catch((err) => {});
	});
	$: {
		if (innerInitValue && initValue && initValue.label === initValue.value) {
			update(id, innerInitValue);
		}
	}
</script>

<div
	class="uniField {required && 'reqField'} {error && 'fieldFillError'}"
	style="--selectFieldColor:{themeColor}"
>
	<label>{label}</label>
	<div class="inputsWrap" data-field-id={id}>
		<Select
			{items}
			placeholder={'Wybierz...'}
			containerClasses={'customContainer'}
			on:clear={handleSelect}
			on:select={handleSelect}
			value={initValue}
		/>
		{#if addHandlerModal}
			<button type="button" on:click={() => openModal(addHandlerModal)} class="add">
				Lub stwórz nowego +
			</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.inputsWrap {
		width: calc(82% + 34px);
		display: flex;
		align-items: center;
		:global(.customContainer) {
			border-color: #505050;
			--borderFocusColor: var(--selectFieldColor);
			--itemIsActiveBG: var(--selectFieldColor);
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
		background-color: var(--selectFieldColor);
		color: #fff;
		font-size: 17px;
		border-radius: 3px;
	}
</style>
