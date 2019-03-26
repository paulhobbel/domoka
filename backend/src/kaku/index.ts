import { KakuDriver } from "./driver"
import { Led } from "../mqtt/components/led";
import { Device } from "../mqtt/device";

let ip: string = '145.48.205.24'; //Raspberry PI ip

console.log('[src/kaku/index] Hello world!\n');

(async () => {
    let kakuDriver: KakuDriver = new KakuDriver();
    let mqttDevice: Device = new Device(ip);
    mqttDevice.addElectronicComponent(new Led(0, false, function(turnOn: boolean, id: number): void {
        if (turnOn) {
            kakuDriver.on('A', id);
        } else {
            kakuDriver.off('A', id);            
        }
    }));
})();