<script>
  import LoginInput from "$lib/loginInput/LoginField.svelte";
  import TabName from "$shared/tabName/TabName.svelte";
  import AccountCircle from "$lib/compIcons/account_circle.svelte";
  import PassCircle from "$lib/compIcons/pass_key.svelte";
  import LoginArrow from "$lib/compIcons//for_login_arrow.svelte";
  import back from "$axios";
  import { addNotif } from "$functions/PopupClient";
  import { goto } from "$app/navigation";

  let usernameCred = "";
  let passCred = "";
  $: {
    console.log(usernameCred, passCred);
  }
  const loginSubmit = () => {
    back
      .post("/userlogin", {
        email: "",
        username: usernameCred,
        password: passCred
      })
      .then((res) => {
        addNotif("success", "Udane logowanie");
        window.location = "/";
      })
      .catch((err) => {
        addNotif("error", "Złe dane logowania", "Sprawdź swój login lub hasło");
        console.log(err);
      });
  };
</script>

<header class="absCenter">
  <TabName text="Zaloguj" />
  <form on:submit|preventDefault={loginSubmit}>
    <LoginInput
      placeholderText={"login"}
      Icon={AccountCircle}
      bind:value={usernameCred}
    />
    <LoginInput
      placeholderText={"hasło"}
      Icon={PassCircle}
      bind:value={passCred}
      type="pass"
    />
    <button class="loginButton" type="submit">
      Zaloguj <div><LoginArrow /></div></button
    >
  </form>
</header>

<style lang="scss">
  header {
    padding: 90px 55px 65px;
    width: fit-content;
    margin: auto;
    height: fit-content;
    box-shadow: 0px 0px 22px #00000029;
    border-radius: var(--modalRounding);

    :global(.loginField:first-child) {
      margin-bottom: 20px;
    }
  }
  .loginButton {
    font-size: 18px;
    margin: auto;
    background-color: var(--mBlue);
    padding: 0 60px 0 38px;
    height: 44px;
    border-radius: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 500;
    margin-top: 2em;
    box-shadow: var(--nShadow);
    & > div {
      background-color: #1a84ff;
      position: absolute;
      right: 0;
      height: 100%;
      border-radius: 100%;
      width: 42px;
      box-shadow: var(--nShadow);
      & > :global(svg) {
        display: block;
        margin: auto;
        height: 100%;
      }
    }
  }
</style>
