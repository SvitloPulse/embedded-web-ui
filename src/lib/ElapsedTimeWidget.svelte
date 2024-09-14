<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    export let lastPing: number | null;
    let elapsedString = "";
    let interval: number;

    function updateElapsed(lastUpdate: number | null) {
        if (!lastUpdate) {
            return;
        }
        let nowTimestamp = Date.now() / 1000;
        const seconds = Math.floor(nowTimestamp - lastUpdate);
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

    $: updateElapsed(lastPing);

    onMount(() => {
        interval = setInterval(() => {
            updateElapsed(lastPing);
        }, 3000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });


</script>

{#if !lastPing}
    <span aria-busy="true">Очікується...</span>
{:else}
    <p>{elapsedString}</p>
{/if}
<style>
</style>
