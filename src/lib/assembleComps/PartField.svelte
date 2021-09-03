<script>
	import { onMount } from 'svelte';
	import back from '$axios';
	import { openModal } from '$functions/modalManager.js';
	import { updateMains, updateQuantity } from './assembleClient';
	import Select from 'svelte-select';
	import { prevent_default } from 'svelte/internal';
	export let id;
	export let data;
	export let themeColor = '#006AE5';
	export let error = undefined;
	export let required = false;
	let items;
	let curInfo;

	$: curInfo = $data[id];

	onMount(() => {
		back.get(`/inventory-all-bycat/${curInfo.segment_id}`).then((res) => {
			items = res.data;
		});
	});
	const handleSelect = (event) => {
		if (curInfo.value.part_id != event.detail.value) updateMains(id, event.detail);
	};
</script>

<div
	class="uniField {required && 'reqField'} {error && 'fieldFillError'} partField"
	style="--selectFieldColor:{themeColor}"
>
	<label>{curInfo.label}</label>
	<div class="innerWrap" data-field-id={id}>
		<div class="withId">
			<Select
				{items}
				placeholder={'Wybierz...'}
				containerClasses={'customContainer'}
				value={curInfo.value && {
					value: curInfo.value.part_id,
					label: curInfo.value.part_name,
					price: curInfo.value.price,
					stock: curInfo.value.stock
				}}
				on:clear={handleSelect}
				on:select={handleSelect}
			/>
			<input
				class="miniCountInput"
				type="number"
				on:input={(e) => updateQuantity(e, id)}
				value={curInfo.quantity}
			/>
			{#if curInfo.value}
				<p>
					id części: {curInfo.value.part_id}
				</p>
			{/if}
		</div>
		{#if curInfo.value}
			<div class="partValue">
				{curInfo.value.price} zł
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.innerWrap {
		width: calc(82% + 34px);
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			:global(input) {
				width: unset;
			}
		}
	}
	.partField {
		border-radius: 15px;

		label {
			border-radius: 15px 0 0 15px;
		}
	}
	.partValue {
		width: 20%;
		padding: 16px;
		background-color: #ececec;
	}
	.withId {
		display: flex;
		align-items: center;
		p {
			margin-left: 20px;
		}
	}
</style>
