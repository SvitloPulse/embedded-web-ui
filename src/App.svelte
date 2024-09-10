<script lang="ts">
  import StatusLabel from "./lib/StatusWidget.svelte";
  import WifiWidget from "./lib/WifiWidget.svelte";
  import { onMount, onDestroy } from "svelte";
  import type { ServerStateUpdate } from "./types";
  import ElapsedTimeWidget from "./lib/ElapsedTimeWidget.svelte";

  let interval: number;
  let serverState: ServerStateUpdate | null = null;
  let stateLoading = true;

  async function fetchUpdate() {
    stateLoading = true;
    const res = await fetch("/api/state");
    serverState = await res.json();
    stateLoading = false;
  }

  onMount(() => {
    fetchUpdate();
    interval = setInterval(fetchUpdate, 3000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<main class="container">
  <h3>SvitloPulse</h3>
  {#if !serverState}
    <center><span aria-busy="true">Завантаження...</span></center>
  {:else}
    <table>
      <tbody>
        <tr>
          <td>Стан:</td>
          <td><StatusLabel status={serverState.status}/></td>
        </tr>
        <tr>
          <td>Останній пінг:</td>
          <td><ElapsedTimeWidget lastPing={serverState.lastPing}/></td>
        </tr>
        <tr>
          <td>WiFi мережа:</td>
          <td>
            <WifiWidget ssid={serverState.ssid} signal={serverState.signal} />
          </td>
        </tr>
        <tr>
          <td>Температура:</td>
          <td>{serverState.temperature} °C</td>
        </tr>
      </tbody>
    </table>
  {/if}
</main>

<style>
</style>
