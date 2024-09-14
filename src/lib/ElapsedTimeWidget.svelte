<script lang="ts">
    export let lastPing: number | null;
    let millisecondsDiff = 0;
    let elapsedString = "";

    function updateElapsed(lastUpdate: number | null) {
        if (!lastUpdate) {
            return;
        }
        let nowTimestamp = Date.now();
        millisecondsDiff = nowTimestamp - lastUpdate;
        const seconds = Math.floor(millisecondsDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            elapsedString = `${days} днів тому`;
        } else if (hours > 0) {
            elapsedString = `${hours} год. тому`;
        } else if (minutes > 0) {
            elapsedString = `${minutes} хв. тому`;
        } else {
            elapsedString = `${seconds} сек. тому`;
        }
    }

    $: updateElapsed(lastPing);

</script>

{#if !lastPing}
    <span aria-busy="true">&nbsp;</span>
{:else}
    <p>{elapsedString}</p>
{/if}
<style>
</style>
