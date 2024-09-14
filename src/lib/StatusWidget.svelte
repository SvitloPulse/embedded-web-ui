<script lang="ts">
    import type { Status } from "../types";
    export let status: Status = "pending";

    const statusText = {
        ok: "ОК",
        error: "Помилки відправки пінгів",
        net_err: "Помилка мережі",
        warning: "Помилка відправки пінгу",
        pending: "Очікується перший пінг"
    };
</script>

<div class="flex">
    <div class={"status " + status} />
    <div>{statusText[status]}</div>
</div>

<style>
    .flex {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
    }
    .status {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		display: inline-block;
	}
    .status.ok {
		background-color: green;
	}
	.status.error {
		background-color: red;
	}
    .status.net_err {
        background-color: red;
    }
	.status.warning {
		background-color: orange;
	}
	.status.pending {
		background-color: gray;
	}
</style>