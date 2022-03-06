<script>
	export let data;
  	import { _ } from "svelte-i18n";
</script>

<div class="gFormattingField">
	<b>{data.supplier_name}</b>
	<span>| {data.phone ? `${$_('suppliers.phone')}: ${data.website},` : ''} ${$_('suppliers.joined')}: {data.join_date}</span>
</div>

<style>
</style>
