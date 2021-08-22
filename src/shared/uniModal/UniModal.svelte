<script>
	import DatetimeField from '$shared/fields/DatetimeField.svelte';
	import inventoryForm from '/config/forms/inventoryForm.js';
	import EmailField from '$shared/fields/EmailField.svelte';
	import createPostClient from '$functions/postClient';
	import IntegerField from '$shared/fields/IntegerField.svelte';
	import PhoneField from '$shared/fields/PhoneField.svelte';
	import PriceField from '$shared/fields/PriceField.svelte';
	import SelectField from '$shared/fields/SelectField.svelte';

	import StringField from '$shared/fields/StringField.svelte';
	import TabName from '$shared/tabName/TabName.svelte';
	let actionButton = {
		do: () => {
			console.log('asgf');
		},
		text: 'Sprzedaj',
		icon: 'static/icons/SellCircle.svg',
		class: 'sellBut'
	};
	let resetButton = {
		do: () => {
			console.log('asgf');
		}
	};
	let tabClickHandler = () => {
		console.log('zami');
	};
	let val;
	let val2;
	let val3;
	let val4;
	let val5;
	let val6;
	let val7;
	let client = createPostClient(inventoryForm);

	$: console.log($client);
</script>

<div class="dimmedBg" />
<section class="uniModal absCenter">
	<TabName text="przykładowyModal" clickHandler={tabClickHandler} />
	<div class="upButtons">
		<button class={`resetButton`}><img src={'static/icons/ResetCircle.svg'} /></button>
		<button class={`doButton ${actionButton.class}`}
			><img src={actionButton.icon} />{actionButton.text}</button
		>
	</div>
	<div class="mainSlot">
		<form>
			<StringField id={0} label={'Segment'} update={client.updateVal} />
			<IntegerField id={1} label={'Quantity'} update={client.updateVal} />
			<PriceField id={2} label={'Cena'} update={client.updateVal} quantity={2} />
			<EmailField id={3} label={'Email'} update={client.updateVal} />
			<PhoneField id={4} label={'Phone'} update={client.updateVal} />
			<DatetimeField id={5} label={'Phone'} update={client.updateVal} />
			<SelectField id={6} label={'Select'} update={client.updateVal} />
			<button class="submit" type="submit" />
		</form>
	</div>
</section>

<style lang="scss">
	.submit {
		width: 100px;
		background-color: #000;
		height: 100px;
	}
	.uniModal {
		z-index: 120;
		background-color: #fff;
		position: fixed;
		width: 71%;
		padding: 30px 66px;
		height: 80vh;
		box-shadow: var(--modalShadow);
		border-radius: var(--modalRounding);
	}
	.doButton {
		font-size: 25px;
		font-weight: 600;
		display: flex;
		align-items: center;
		box-shadow: var(--btnShadow);
		padding: 13px 34px 13px 20px;
		border-radius: 24px;
		img {
			margin-right: 15px;
			width: 36px;
		}
	}
	.resetButton {
		box-shadow: var(--btnShadow);
		padding: 13px;
		border-radius: 24px;
		margin-right: 20px;
		img {
			width: 36px;
			display: block;
		}
	}
	.upButtons {
		display: flex;
		margin-bottom: 45px;
		justify-content: flex-end;
	}
	.dimmedBg {
		position: fixed;
		z-index: 90;
		background-color: rgba(0, 0, 0, 0.26);
		width: 100vw;
		height: 100vh;
		top: 0;
	}
</style>
