<script>
  export let id;
  export let label;
  export let update;
  export let initValue = "";
  export let error = undefined;
  import { _ } from "svelte-i18n";
</script>

<div class="finishedField  {error && 'fieldFillError'}" data-field-id={id}>
  <label>{label($_)}</label>
  <button
    class="finish {initValue && 'finished'}"
    type="button"
    on:click={() => update(id, !initValue)}
  >
    {#if initValue !== undefined}
      <span>{initValue ? "Zakończono" : "Nie zakończono"}</span>
    {/if}
  </button>
</div>

<style>
  .finishedField {
    text-align: center;
  }
  .finish {
    box-shadow: var(--btnShadow);
    display: block;
    margin: 15px auto;
    background-color: #d21919;
    color: #fff;
    padding: 15px 30px 15px 65px;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 600;
    background-repeat: no-repeat;
    background-size: 40px;
    background-position-y: center;
    background-position-x: 18px;
    background-repeat: no-repeat;
    background-image: url("/icons/NotFinished.svg");
  }
  .finished {
    background-color: #47da43;
    background-image: url("/icons/FinishedProblem.svg");
  }
</style>
