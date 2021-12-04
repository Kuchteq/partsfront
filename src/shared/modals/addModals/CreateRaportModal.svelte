<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import problemsForm from "/config/forms/problemsForm.js";
  import createPostClient from "$functions/postClient";
  import { formatDateOnly } from "/config/formatHelpers.js";
  import { addNotif } from "$functions/PopupClient";
  import { goto } from "$app/navigation";
  let modalName = "createRaports";
  let formRef;

  let dateFrom = "";

  let dateTo = "";
  let actionButton = {
    do: () => {
      let successMessage = {
        title: `Sukces!`,
        desc: `Raport od ${dateFrom} do ${dateTo} został wygenerowany.`
      };
      if (dateFrom && dateTo && dateTo <= dateFrom) {
        addNotif("error", "Data końcowa musi być większa od początkowej");
        return;
      } else if (!dateFrom || !dateTo) {
        addNotif("error", "Wypełnij wszystkie pola");
        return;
      } else {
        window.location.href = `/viewraport/${dateFrom}t${dateTo}`;
        addNotif("success", successMessage);
      }

      //pass name to
    },
    text: "Wygeneruj",
    icon: "/icons/AddCircle.svg"
  };

  let resetAction = () => {
    client.resetValues();
  };
</script>

<UniModal
  {modalName}
  theme="createRaports"
  {actionButton}
  {resetAction}
  tabName="Stwórz raport"
>
  <h2>
    Okres raportu:
    <h2>
      <div class="spanButtons">
        <label for="od"
          ><span>Od:</span><input bind:value={dateFrom} name="od" type="date" />
        </label>
        <label for="do"
          ><span>Do:</span><input bind:value={dateTo} name="do" type="date" />
        </label>
      </div>
    </h2>
  </h2></UniModal
>

<style lang="scss">
  :global(.uniModal.createRaports) {
    --themeGradient: var(--graGold);
    --themeColor: var(--mGold);
    --actionColor: var(--graGold);
  }
  h2 {
    font-weight: 600;
    font-size: 1.2rem;
    text-align: center;
  }
  .spanButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    width: 100%;
    label {
      padding: 10px;
      background-color: #fff7e2;
      border-radius: 16px;
      border: 1px solid #505050;
      font-size: 16px;
      span {
        margin-right: 20px;
      }
      input {
        background-color: #fff7e2;
        font-size: 1.2em;
        &::-webkit-calendar-picker-indicator {
          background-color: #fff;
          border: 1px solid #505050;
          cursor: pointer;
        }
      }
      &:first-child {
        margin-right: 25px;
      }
    }
  }
</style>
