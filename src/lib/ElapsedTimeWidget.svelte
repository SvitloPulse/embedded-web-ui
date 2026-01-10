<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    export let lastPingUs: number | null;
    export let uptimeUs: number | null;

    let elapsedString = "";
    let interval: ReturnType<typeof setInterval>;
    const MICROSECONDS_IN_SECOND = 1_000_000;

    function updateElapsed(lastUpdate: number | null, currentUptime: number | null) {
        if (lastUpdate == null || currentUptime == null) {
            elapsedString = "Очікується...";
            return;
        }

        const elapsedUs = currentUptime - lastUpdate;
        if (elapsedUs < 0) {
            elapsedString = "Очікується...";
            return;
        }

        const seconds = Math.floor(elapsedUs / MICROSECONDS_IN_SECOND);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            elapsedString = `${days} днів тому`;
        } else if (hours > 0) {
            elapsedString = `${hours} год тому`;
        } else if (minutes > 0) {
            elapsedString = `${minutes} хв ${seconds % 60} с тому`;
        } else {
            elapsedString = `${seconds} с тому`;
        }
    }

    $: updateElapsed(lastPingUs, uptimeUs);

    onMount(() => {
        interval = setInterval(() => {
            updateElapsed(lastPingUs, uptimeUs);
        }, 3000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });


</script>

{#if lastPingUs == null || uptimeUs == null}
    <span aria-busy="true">Очікується...</span>
{:else}
    <p>{elapsedString}</p>
{/if}
<style>
</style>
