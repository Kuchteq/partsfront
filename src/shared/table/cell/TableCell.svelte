<script>
  //receive the props
  export let result;
  export let labels;
  export let highlighted;
  export let selectedCells;
  export let onDoubleClick = () => {};
  export let onSingleClick = () => {};

  let row = Object.values(result);
  let id = row[0];
  let grayedOut = false;

  /*determining means that the cell is grayed out
	  useful in problems table to make the finished problems grayed out*/
  let isDetermining = labels.slice(-1)[0].determining;
  if (isDetermining && row.slice(-1)[0]) {
    grayedOut = true;
  }
</script>

<ul
  class="{selectedCells && $selectedCells.findIndex((idx) => idx == id) != -1
    ? 'selected'
    : ''} {grayedOut ? 'grr' : ''}"
  on:dblclick={onDoubleClick(id)}
  on:click={onSingleClick(id)}
>
  <button>
    <!-- For every column in the row create a list item tag with the appropriate data -->
    {#each row as column, i}
      <li
        class="{labels[i].widthClass} 
			{!labels[i].shown || (isDetermining && i == row.length - 1)
          ? 'hiddenDisplay'
          : ''} 
			{highlighted == i ? 'highlighted' : ''}"
      >
        {!column && column !== 0
          ? ""
          : labels[i].format
          ? labels[i].format(column)
          : column}
      </li>
    {/each}
  </button>
</ul>

<style lang="scss">
  @keyframes highlightCell {
    from {
      background-color: var(--moduleThemeColor);
    }
    to {
      background-color: transparent;
    }
  }
  button {
    width: 100%;
    display: flex;
    text-align: left;
  }
  ul {
    display: flex;
    border: 1px solid #cfcfcf;
    border-radius: 14px;
    box-shadow: 0px 0px 4px #00000033;
    margin-top: 8px;
    font-weight: 500;
    animation: fadeIn 0.1s;
    transition: 0.1 all;
    cursor: pointer;
    background-color: #fff;
    &:nth-child(even) {
      background-color: #eeeeee;
    }
    &:hover {
      background-color: var(--hoverCell, #e1e1e1);
    }
    &.grr {
      background-color: #fff;
      color: rgb(199, 199, 199);
    }
    &.selected {
      background-color: var(--selectedCellColor);
      &:hover {
        background-color: var(--selectedCellColor);
      }
    }

    li.highlighted {
      animation: highlightCell 2.5s;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  li {
    padding: 12px 16px;
    word-break: break-word;
  }

  .hiddenDisplay {
    display: none;
  }
</style>
