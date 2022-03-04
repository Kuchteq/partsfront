<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import { addNotif } from "$functions/PopupClient";
  import modalsState from "$functions/modalManager";
  import { _ } from "/config/i18n.js";
  let modalName = "createReports";

  const today = new Date().toISOString().substring(0, 10);
  let dateFrom = $modalsState.createReports.from
    ? $modalsState.createReports.from
    : "";
  let dateTo = $modalsState.createReports.to
    ? $modalsState.createReports.to
    : today;

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("viewreport.report_generated", {
          values: { from: dateFrom, to: dateTo }
        })
      };
      if (dateFrom && dateTo && dateTo <= dateFrom) {
        addNotif("error", $_("viewreport.end_date_error"));
        return;
      } else if (!dateFrom || !dateTo) {
        addNotif("error", $_("viewreport.fill_every"));
        return;
      } else {
        window.location.href = `/viewreport/${dateFrom}t${dateTo}`;
        addNotif("success", successMessage.title, successMessage.desc);
      }

      //pass name to
    },
    text: $_("modal_action_btns.generate"),
    icon: "/icons/AddCircle.svg"
  };

  let resetAction = () => {
    client.resetValues();
  };
</script>

<UniModal
  {modalName}
  theme="createReports"
  {actionButton}
  {resetAction}
  tabName={$_("modal_tabs.make_report")}
>
  <h2>
    {$_("viewreport.period")}
    <h2>
      <div class="spanButtons">
        <label for="od"
          ><span>{$_("misc.from")}</span><input
            bind:value={dateFrom}
            name="od"
            type="date"
          />
        </label>
        <label for="do"
          ><span>{$_("misc.to")}</span><input
            bind:value={dateTo}
            name="do"
            type="date"
          />
        </label>
      </div>
    </h2>
  </h2></UniModal
>

<style lang="scss">
  :global(.uniModal.createReports) {
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
