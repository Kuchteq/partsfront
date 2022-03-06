<script>
	export let data;
	import { _ } from "svelte-i18n";
</script>

<div class="gFormattingField">
	<b>{data.client_name}</b>
	<span
		>| {data.phone ? `${$_('clients.phone')}: ${data.phone},` : ''}
		{data.email ? `email: ${data.email}` : ''}, {$_('joined_at')}: {data.join_date}</span
	>
</div>

<style>
</style>
