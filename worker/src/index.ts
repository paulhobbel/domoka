import worker from "./worker";
import { ISchedule, IDevice } from "./interfaces";
import { KakuDriver } from "./kaku/driver";
import { ManipulationMessage } from "./messages/manipulationMessage";

console.log('[worker/src/index.ts]: Hello world!\n');

const driver = new KakuDriver();
const schedules = new Map<number, ISchedule>();

function updateSchedules() {
    const activeSchedules = [...schedules.values()]
        .filter(schedule => schedule.status);

    const date = new Date();
    //const hours = date.getUTCHours();
    const minutes = date.getMinutes() + date.getHours() * 60;

    console.log(`[Schedules]: Updating schedules, current time: [${date.getHours()}:${date.getMinutes()}]`);

    for(const schedule of activeSchedules) {
        const beginTime = schedule.beginTime.split(':');
        const endTime = schedule.endTime.split(':');

        const beginMinutes = parseInt(beginTime[1]) + parseInt(beginTime[0]) * 60;
        const endMinutes = parseInt(endTime[1]) + parseInt(endTime[0]) * 60;

        if(minutes >= beginMinutes && minutes < endMinutes) {
            console.log(`[Schedules]: Schedule ${schedule.id} is now active`);
            schedule.triggered = true;
            for(const id of schedule.devices) {
                worker.publish('manirequest', {id, status: true});
            }
        } else if (minutes < beginMinutes || minutes >= endMinutes) {
            console.log(`[Schedules]: Schedule ${schedule.id} is not active`);
            for(const id of schedule.devices) {
                worker.publish('manirequest', {id, status: false});
            }
        }
    }
}

(async () => {
    await worker.connect();

    worker.subscribe('sync', (sync: { devices: IDevice[], schedules: ISchedule[] }) => {
        sync.schedules.forEach((schedule) => {
            schedules.set(schedule.id, schedule);
        });

        sync.devices.forEach((device) => {
            driver.transmit('A', device.id, device.status);
        });

        updateSchedules();
    });

    worker.subscribe('manipulation', (manipulation: ManipulationMessage) => {
        console.log(`[Worker]: Received manipulation ${manipulation.id} - status: ${manipulation.turnOn}`);
        driver.transmit('A', manipulation.id, manipulation.turnOn);
    });

    worker.subscribe('schedule', (schedule: ISchedule) => {
        console.log(`[Worker]: Changed schedule ${schedule.id}`);
        schedules.set(schedule.id, schedule);
        updateSchedules();
    });

    setInterval(() => { 
        updateSchedules();
    }, 60000); 
})();