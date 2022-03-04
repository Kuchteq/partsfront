<script>
  import modalsState from "$functions/modalManager";
  //normal modal imports
  import AddModal from "./addModals/AddModal.svelte";
  import ClientsModal from "./addModals/ClientsModal.svelte";
  import SellModal from "./addModals/SellModal.svelte";
  import SuppliersModal from "./addModals/SuppliersModal.svelte";
  import ProblemsModal from "./addModals/ProblemsModal.svelte";
  import CreateReportModal from "./addModals/CreateReportModal.svelte";
  import AssembleModal from "./addModals/AssembleModal.svelte";
  //update modal imports
  import InventoryUpdateModal from "./updateModals/InventoryUpdateModal.svelte";
  import SuppliersUpdateModal from "./updateModals/SuppliersUpdateModal.svelte";
  import ClientsUpdateModal from "./updateModals/ClientsUpdateModal.svelte";
  import ComputersUpdateModal from "./updateModals/ComputersUpdateModal.svelte";
  import ProblemsUpdateModal from "./updateModals/ProblemsUpdateModal.svelte";
  import OrderUpdateModal from "./updateModals/OrderUpdateModal.svelte";
</script>

{#if $modalsState.add}
  <AddModal />
{/if}

{#if $modalsState.sell}
  <SellModal />
{/if}
{#if $modalsState.clients}
  <ClientsModal />
{/if}
{#if $modalsState.suppliers}
  <SuppliersModal />
{/if}

{#if $modalsState.assemble}
  <AssembleModal />
{/if}

{#if $modalsState.problems}
  <ProblemsModal />
{/if}

{#if $modalsState.createReports}
  <CreateReportModal />
{/if}
<!-- Modals associated with previewing/updating data -->
{#if $modalsState.inventoryUpdate}
  <InventoryUpdateModal />
{/if}

{#if $modalsState.suppliersUpdate}
  <SuppliersUpdateModal />
{/if}

{#if $modalsState.clientsUpdate}
  <ClientsUpdateModal />
{/if}
{#if $modalsState.computersUpdate}
  <ComputersUpdateModal />
{/if}

{#if $modalsState.problemsUpdate}
  <ProblemsUpdateModal />
{/if}

{#if $modalsState.orderUpdate}
  <OrderUpdateModal />
{/if}
