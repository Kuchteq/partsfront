<script>
  import { setupI18n } from "/config/i18n.js";
  import { locale } from "svelte-i18n";
  let isOpen = false;
  function switchLang(lang) {
    setupI18n({ withLocale: lang });
    window.localStorage.setItem("lang", lang);
  }
</script>

<div class="langWrap">
  <button type="button" class="langOn" on:click={() => (isOpen = !isOpen)} />
  <div class="langList {isOpen ? 'revealed' : ''} {$locale}">
    <button type="button" on:click={() => switchLang("pl")}>PL</button>
    <button type="button" on:click={() => switchLang("en")}>EN</button>
  </div>
</div>

<style>
  .langWrap {
    position: relative;
  }
  .langOn {
    width: 58px;
    height: 58px;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    background-image: url("/icons/Language.svg");
    background-color: #fff;
    position: relative;
    z-index: 10;
  }
  .en button:last-child {
    font-weight: 900;
    opacity: 1;
  }
  .pl button:first-child {
    font-weight: 900;
    opacity: 1;
  }
  .langList {
    position: absolute;
    top: 0px;
    left: 50%;
    transition: var(--sTrans);
    transform: translate(-50%, -40px);
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px 10px 30px 10px;
    box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 5px;
    opacity: 0;
  }
  .langList button {
    opacity: 0.6;
    transition: var(--sTrans);
  }
  .revealed {
    transform: translate(-50%, -70px);
    opacity: 1;
  }
</style>
