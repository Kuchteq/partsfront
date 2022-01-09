<script>
  /* The app basically starts here (excluding the app.html which just holds
  	some basic html shared across all the components) */

  //Modules imported in this component are anchored on every page
  import PopupPanel from "$shared/statusPopup/PopupPanel.svelte";
  import ModalManager from "$shared/modals/ModalManager.svelte";
  import { onMount } from "svelte";
  import { setupI18n } from "/config/i18n.js";

  setupI18n({ withLocale: "en" });

  onMount(() => {
    if (window.localStorage.getItem("lang")) {
      setupI18n({ withLocale: window.localStorage.getItem("lang") });
    }
  });
  /* CSS styles imported here are global, these classes are available everywhere throughout the app,
  	unlike the ones in the components which are local - only available in the specific component */
  import "../styles/reset.scss";
  import "../styles/_vars.scss";
  import "../styles/globals.scss";
  import "../styles/moduleGlobs.scss";
</script>

<main>
  <PopupPanel />
  <ModalManager />
  <!--  slot is a special element symbolising children components/elements passed to the component,
        in the __layout the passed children are the contents of the actual page routes
        - the files that are in the src/route folder -->
  <slot />
</main>
