<script>
  export let text;
  export let href;
  export let icon;
  import { _ } from "/config/i18n.js";
</script>

<a {href}> <img src={icon} /><span>{text($_)}</span> </a>

<style lang="scss">
  a {
    height: 102px;
    font-weight: 600;
    font-size: 32px;
    width: 30%;
    color: #fff;
    box-shadow: 0px 2px 16px #00000033;
    padding: 28px 4%;
    display: block;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    align-items: center;
    transition: var(--sTrans);
    &:hover {
      filter: brightness(1.1);
      box-shadow: 0px 2px 20px #8d8d8d99;
    }
  }
  img {
    width: 58px;
    display: block;
    margin-right: 10px;
  }
</style>
