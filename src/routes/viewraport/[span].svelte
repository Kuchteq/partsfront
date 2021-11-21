<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		if (session.Authorization) {
			const [from, to] = page.params.span.split('t');
			const url = `http://localhost:5000/getraport/${from}/${to}`;
			const res = await fetch(url);
			if (res.ok) {
				return {
					props: {
						data: await res.json(),
						span: { from, to }
					}
				};
			}

			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		} else {
			return { status: 303, redirect: '/login' };
		}
	}
</script>

<script>
	import { toQueryDate } from '$functions/dateHandler';
	import IndividualSales from '$lib/viewraports/IndividualSales.svelte';
	import ClientsInfo from '$lib/viewraports/moduleSpaces/ClientsInfo.svelte';
	import GeneralInfo from '$lib/viewraports/moduleSpaces/generalInfo.svelte';
	import SegmentsInfo from '$lib/viewraports/moduleSpaces/SegmentsInfo.svelte';
	import SuppliersInfo from '$lib/viewraports/moduleSpaces/SuppliersInfo.svelte';
	import BackFromModule from '$shared/backFromModule/backFromModule.svelte';
	export let data;
	export let span;
	const generalData = {
		generalInfo: data.generalInfo,
		byMonthInfo: data.byMonthInfo,
		byWeekInfo: data.byWeekInfo
	};
</script>

<div class="padCenter">
	<header>
		Raport z okresu od {span.from.replaceAll('-', '/')} do {span.to.replaceAll('-', '/')}
	</header>

	<GeneralInfo data={generalData} />
	<SegmentsInfo data={data.segmentInfo} />
	<ClientsInfo data={data.clientsInfo} />
	<SuppliersInfo data={data.suppliersSalesInfo} />
</div>
<h2>Sprzedane w tamtym czasie części</h2>
<IndividualSales {span} />

<BackFromModule
	name="Raport z okresu od {span.from.replaceAll('-', '/')} do {span.to.replaceAll('-', '/')}"
/>

<style lang="scss">
	.padCenter {
		padding: 50px 15%;
		width: 70%;
		position: relative;
	}
	header {
		width: fit-content;
		font-size: 22px;
		font-weight: 600;
		&::after {
			content: '';
			background: var(--graGold);
			width: 60%;
			margin-top: 10px;
			display: block;
			position: relative;
			height: 4px;
		}
	}
	h2 {
		font-size: 26px;
		font-weight: 700;
		margin-top: 50px;
		color: var(--mGold);
		text-align: center;
	}
</style>
