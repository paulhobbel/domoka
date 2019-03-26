export interface ISchedule {
    id: number;
    beginTime: string;
    endTime: string;
    status: number;
    devices: number[];
    triggered: boolean;
}