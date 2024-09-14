export type Status = 'ok' | 'error' | 'warning' | 'pending' | 'net_err';

export interface ServerStateUpdate {
    status: Status;
    lastPing: number | null;
    ssid: string;
    rssi: number;
    temperature: number;
    version: string;
    chip_model: string;
}