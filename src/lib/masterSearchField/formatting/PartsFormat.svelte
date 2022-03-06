<script>
	export let data;
 	import { _ } from "svelte-i18n";
</script>

<div class="gFormattingField">
	<span>{data.segment_name} | </span> <b>{data.part_name}</b>
	<span>|	{$_('inventory.purchase_date')} : {data.purchase_date}, {$_('inventory.stock')}: {data.stock} , {$_('misc.from')}: {data.suppliers_name}</span>
</div>

<style>
</style>
