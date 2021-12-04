<script>
	export let data;
</script>

<div class="gFormattingField">
	<b>{data.client_name}</b>
	<span
		>| {data.phone ? `Telefon: ${data.phone},` : ''}
		{data.email ? `email: ${data.email}` : ''}, dołączono: {data.join_date}</span
	>
</div>

<style>
</style>
