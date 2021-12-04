<script>
	export let data;
</script>

<div class="gFormattingField">
	<span> {data.computer_name} | </span><b>{data.problem_note}</b>
	<span> {data.deadline_date ? `| Deadline: ${data.deadline_date},` : ''}</span>
</div>

<style>
</style>
