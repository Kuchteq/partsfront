<script>
  //import the components
  import TabName from "$shared/tabName/TabName.svelte";
  import { closeModal } from "$functions/modalManager";

  //receive the props - modal data
  export let modalName;
  export let tabName = "";
  export let actionButton = {
    do: () => {},
    text: "",
    icon: ""
  };
  export let deleteButton;
  export let resetAction = () => {};
  // pass css variables such as themeGradient
  export let theme;

  let closeModalHandler = () => {
    closeModal(modalName);
  };
</script>

<div class="dimmedBg" />
<section class="uniModal absCenter {theme}" id="modal-{modalName}">
  <TabName text={tabName} clickHandler={closeModalHandler} />
  <div class="upButtons">
    {#if deleteButton}
      <button
        class={`otherActionBtn deleteBtn`}
        on:click={deleteButton.do()}
        style={deleteButton.color
          ? `--deleteBtnColor:${deleteButton.color}`
          : ""}
        ><img
          src={deleteButton.icon
            ? deleteButton.icon
            : "/icons/DeleteForever.svg"}
          alt="Delete Forever"
        /></button
      >
    {/if}
    <button class={`otherActionBtn`} on:click={resetAction()}
      ><img src={"/icons/ResetCircle.svg"} alt="Reset" /></button
    >
    <button
      class="actionButton"
      type="submit"
      on:click={() => actionButton.do()}
      ><img src={actionButton.icon} alt="Proceed" />{actionButton.text}</button
    >
  </div>
  <div class="mainSlot">
    <slot />
  </div>
</section>

<style lang="scss">
  .mainSlot {
    height: 85%;
    overflow-y: auto;
    padding: 10px;
  }
  .uniModal {
    z-index: 120;

    background-color: #fff;
    position: fixed;
    width: 71%;
    padding: 30px 66px;
    height: 80vh;
    box-shadow: var(--modalShadow);
    border-radius: var(--modalRounding);
    animation: fadeIn 0.1s;
    --deleteBtnColor: #000;
  }
  .actionButton {
    font-size: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
    box-shadow: var(--btnShadow);
    background: var(--actionColor);
    color: #fff;
    padding: 13px 44px 13px 30px;
    border-radius: 24px;
    img {
      margin-right: 15px;
      width: 36px;
    }
  }
  .otherActionBtn {
    box-shadow: var(--btnShadow);
    padding: 13px;
    border-radius: 24px;
    margin-right: 20px;
    background-color: #686868;
    img {
      width: 36px;
      display: block;
      transition: 0.4s all;
    }
    &:hover {
      img {
        transform: rotate(-360deg);
      }
    }
  }
  .deleteBtn {
    background-color: var(--deleteBtnColor);
  }
  .upButtons {
    display: flex;
    margin-bottom: 45px;
    justify-content: flex-end;
  }
  .dimmedBg {
    position: fixed;
    z-index: 90;
    background-color: rgba(0, 0, 0, 0.26);
    width: 100vw;
    height: 100vh;
    top: 0;
    animation: fadeIn 0.1s;
  }
</style>
