<script>
	import { onMount } from 'svelte';
	import { init } from 'svelte/internal';

	export let quantity = 0;
	export let id;
	export let label;
	export let update;
	export let required = true;
	export let initValue = 0;
	export let error = undefined;
	let value = 0;
	let currency = 'PLN ';

	let ref;

	function formatNumber(n) {
		return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '');
	}

	function formatCurrency(input, blur) {
		let input_val = input.value;
		if (
			input_val == '' ||
			input_val.split(' ')[1] === '' ||
			input_val.split(' ')[1] === '.' ||
			input_val.split(' ')[1] === '.00'
		) {
			input_val = '';
			input.value = '';
			update(id, 0);
			return;
		}

		let original_len = input_val.length;

		let caret_pos = input.selectionStart;
		if (input_val.indexOf('.') >= 0) {
			let decimal_pos = input_val.indexOf('.');

			let left_side = input_val.substring(0, decimal_pos);
			let right_side = input_val.substring(decimal_pos);

			left_side = formatNumber(left_side);

			right_side = formatNumber(right_side);

			if (blur === 'blur') {
				right_side += '00';
			}

			right_side = right_side.substring(0, 2);

			input_val = currency + left_side + '.' + right_side;
		} else {
			input_val = formatNumber(input_val);
			input_val = currency + input_val;

			if (blur === 'blur') {
				if (input_val == '0.00') {
					0;
				} else {
					input_val += '.00';
				}
			}
		}
		input.value = input_val;
		value = input_val.split(' ')[1];
		update(id, parseFloat(value));
		let updated_len = input_val.length;
		caret_pos = updated_len - original_len + caret_pos;
		input.setSelectionRange(caret_pos, caret_pos);
	}
	onMount(() => {
		formatCurrency(ref, 'blur');
	});
</script>

<div class="uniField {required && 'reqField'} {error && 'fieldFillError'}" data-field-id={id}>
	<label>{label}</label>
	<input
		bind:this={ref}
		on:blur={(e) => formatCurrency(e.target, 'blur')}
		on:keyup={(e) => formatCurrency(e.target, formatCurrency)}
		type="currency"
		placeholder="0,00"
		value={'PLN ' + (initValue == 0 ? '' : initValue)}
	/>
	{#if quantity && value != ''}
		<p>Wartość {value * quantity} zł</p>
	{/if}
</div>

<style>
	p {
		color: #aaaaaa;
		position: absolute;
		right: 20px;
		border-left: 1px solid #505050;
		padding: 16px 16px 16px 30px;
	}
</style>
