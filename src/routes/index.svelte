<script context="module">
	export const prerender = false;
	import TabName from '$shared/tabName/TabName.svelte';
	import AddInventoryButton from '$shared/buttons/add/AddInventoryButton.svelte';
	import SellInventoryButton from '$shared/buttons/sell/SellInventoryButton.svelte';
	import AssembleComputerButton from '$shared/buttons/assemble/AssembleComputerButton.svelte';
	import UniModuleLink from '$shared/buttons/UniModuleLink/UniModuleLink.svelte';
	import MasterSearchField from '$shared/searchField/MasterSearchField.svelte';

	import authWatch from '$functions/authWatch.js';
import MoreOptions from '$lib/moreOptions/MoreOptions.svelte';

	export async function load({ session }) {
		return await authWatch({ session });
	}

	const baseIconFolder = '/icons/';

	const moduleDirections = [
		{
			name: 'Inwentarz',
			href: '/inventory',
			icon: 'InventoryModuleIcon.svg'
		},
		{
			name: 'Raporty',
			href: '/raports',
			icon: 'RaportsModuleIcon.svg'
		},
		{
			name: 'Zestawy',
			href: '/computers',
			icon: 'ComputersModuleIcon.svg'
		},
		{
			name: 'Klienci',
			href: '/clients',
			icon: 'ClientsModuleIcon.svg'
		},
		{
			name: 'Dostawcy',
			href: '/suppliers',
			icon: 'SuppliersModuleIcon.svg'
		},
		{
			name: 'Problemy',
			href: '/problems',
			icon: 'ProblemsModuleIcon.svg'
		},
		{
			name: 'Historia',
			href: '/history',
			icon: 'HistoryModuleIcon.svg'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<TabName text="Witaj w PartsKeeperze" />

	<h4>Szybkie akcje</h4>
	<div class="fastActionsHolder">
		<AddInventoryButton larger />
		<SellInventoryButton larger />
		<AssembleComputerButton larger />
	</div>
	<MasterSearchField />
	<h3>Moduły</h3>
	<div class="toModules">
		{#each moduleDirections as direction}
			<UniModuleLink
				text={direction.name}
				href={direction.href}
				icon={baseIconFolder + direction.icon}
			/>
		{/each}
	</div>
</section>
<MoreOptions/>

<style lang="scss">
	section {
		width: 950px;
		padding: 130px 85px 30px;
		box-shadow: 0px 0px 22px #00000029;
		border-radius: var(--modalRounding);
		display: block;
		margin: 40px auto 0;
		position: relative;
		h4 {
			font-size: 20px;
			margin-bottom: 22px;
		}
	}
	.fastActionsHolder {
		display: flex;
		margin-bottom: 40px;
		justify-content: space-between;
	}
	h3 {
		font-size: 20px;
		margin-top: 42px;
		margin-bottom: 22px;
	}
	.toModules {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		& > :global(a) {
			margin-bottom: 45px;
			&:nth-child(1) {
				background: var(--graBlue);
			}
			&:nth-child(2) {
				background: var(--graGold);
			}
			&:nth-child(3) {
				background: var(--mPurple);
			}
			&:nth-child(4) {
				background: var(--graClients);
			}
			&:nth-child(5) {
				background: var(--graSuppliers);
			}
			&:nth-child(6) {
				background: var(--graOrange);
			}
			&:nth-child(7) {
				background: var(--graHistory);
			}
		}
	}
</style>
