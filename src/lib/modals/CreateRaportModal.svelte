<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import problemsForm from '/config/forms/problemsForm.js';
	import createPostClient from '$functions/postClient';
	import {formatDateOnly} from '/config/formatHelpers.js';
	let modalName = 'createRaports';
	let formRef;

	let dateFrom = formatDateOnly(new Date());
	
	let dateTo = '';
	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `Problem związany z komputerem został dodany`
			};
			//pass name to
			},
		text: 'Dodaj',
		icon: '/icons/AddCircle.svg'
	};

	let resetAction = () => {
		client.resetValues();
	};
</script>

<UniModal {modalName} theme="createRaports" {actionButton} {resetAction} tabName="Stwórz raport">
	<h2>Okres raportu:<h2>
	<div class = 'spanButtons'>
		<label for = 'od'><span>Od:</span><input bind:this={dateFrom} name='od' type = 'date'/> </label>
		<label for = 'do'><span>Do:</span><input  bind:this={dateTo} name='do' type = 'date'/> </label>
	</div>
</UniModal>

<style lang='scss'>
	:global(.uniModal.createRaports) {
		--themeGradient: var(--graGold);
		--themeColor: var(--mGold);
		--actionColor: var(--graGold);
	}
	h2
	{
		font-weight:600;
		font-size:1.2rem;
		text-align: center;
	}
	.spanButtons
	{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 15px auto;
		width: 100%;
		label
		{
			padding:10px;
			background-color: #FFF7E2;
			border-radius: 16px;
			border:1px solid #505050;
				font-size:16px;
				span{
					margin-right: 20px;
				}
			input
			{
				background-color:#FFF7E2;
				&::-webkit-calendar-picker-indicator {
					background-color:#fff;
					border:1px solid #505050;
					cursor:pointer;
	}

			}
			&:first-child
			{
				margin-right:25px;
			}
		}
	}
</style>
