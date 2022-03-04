<script>
  import { _ } from "svelte-i18n";
  export let id;
  export let label;
  export let update;
  export let initValue = "";
  export let error = undefined;
  export let required = true;
  export let placeholder = "";
</script>

<div
  class="uniField {required && 'reqField'} {error && 'fieldFillError'}"
  data-field-id={id}
>
  <label>{label($_)}</label>
  <input
    placeholder={placeholder ? placeholder($_) : ""}
    on:input={(e) => update(id, e.target.value)}
    value={initValue}
    type="text"
  />
</div>

<style>
</style>
