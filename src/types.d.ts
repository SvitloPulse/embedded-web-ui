export type Status = 'ok' | 'error' | 'warning' | 'pending';

export interface ServerStateUpdate {
    status: Status;
    lastPing: number | null;
    ssid: string;
    signal: number;
    temperature: number;
}