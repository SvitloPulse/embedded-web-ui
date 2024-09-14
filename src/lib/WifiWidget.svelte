<script lang="ts">
    export let rssi: number;
    export let ssid: string;
    
    let bars: string[] = [];
    function setBars(_rssi: number) {
		let signal = 0;
		if (_rssi < -90) {
			signal = 0;
		} else if (_rssi < -75) {
			signal = 1;
		} else if (_rssi < -65) {
			signal = 2;
		} else if (_rssi < -55) {
			signal = 3;
		} else {
			signal = 4;
		}
        for (let i=1; i<=4; i++) {
            if (signal >= i) {
                bars.push(`bar bar${i} active`);
            } else {
                bars.push(`bar bar${i}`);
            }
        }
        bars = bars;
    }

    $: setBars(rssi);

</script>

<div class="flex">
    <div class="signal-bars">
        <div class={bars[0]}></div>
        <div class={bars[1]}></div>
        <div class={bars[2]}></div>
        <div class={bars[3]}></div>
    </div>
    <div>{ssid}</div>
</div>

<style>
	.flex {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
	}
	.signal-bars {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		width: 26px;
	}
	.bar {
		width: 5px;
		background-color: lightgray;
		transition: background-color 0.3s ease;
	}
	.bar1 {
		height: 5px;
	}
	.bar2 {
		height: 10px;
	}
	.bar3 {
		height: 15px;
	}
	.bar4 {
		height: 20px;
	}
    /* Active bars will be green */
	.bar.active {
		background-color: green;
	}
</style>
