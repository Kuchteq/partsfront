<script>
  import back from "$axios";
  import { addNotif } from "$functions/PopupClient";
  import Langs from "./Langs.svelte";
  import { _ } from "/config/i18n.js";
  const logout = () => {
    back
      .post("/userlogout")
      .then(() => {
        window.location = "/login";
        addNotif("success", $_("login.logout_success_title"));
      })
      .catch((e) => {
        console.log("Nie wylogowano");
      });
  };
</script>

<div class="moreOptions">
  <Langs />
  <button type="button" class="logout" on:click={logout} />
</div>

<style>
  button {
    width: 58px;
    height: 58px;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
  }
  .logout {
    background-image: url("/icons/Logout.svg");
  }

  .moreOptions {
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    gap: 10px;
  }
</style>
