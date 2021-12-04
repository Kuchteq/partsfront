<script>
  /* The app basically starts here (excluding the app.html which just holds
  	some basic html shared across all the components) */

  //Modules imported in this component are anchored on every page
  import PopupPanel from "$shared/statusPopup/PopupPanel.svelte";
  import ModalManager from "$shared/modalManager/ModalManager.svelte";

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
