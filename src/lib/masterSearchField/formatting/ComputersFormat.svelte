<script>
	export let data;
  	import { _ } from "svelte-i18n";
</script>

<div class="gFormattingField">
	<b>{data.computer_name}</b>
	<span>| {$_('sets.value')}: {data.computer_value}, {$_('sets.assembled_at')}: {data.assembled_at}</span>
</div>

<style>
</style>
