<script>
	export let data;
</script>

<div class="gFormattingField">
	<b>{data.supplier_name}</b>
	<span>| {data.phone ? `Telefon: ${data.website},` : ''} dołączono: {data.join_date}</span>
</div>

<style>
</style>
