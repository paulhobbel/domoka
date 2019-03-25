import {Controller} from './controller';
import {Device} from './device';

console.log('[src/mqtt/index] Hello world!\n');

// let ip: string = '192.168.178.32'; //Raspberry PI ip
let ip: string = 'test.mosquitto.org:1883'; //Test ip
let deviceName: string = 'device_123';

let controller: Controller = new Controller(ip, deviceName);
let led1: Device = new Device(1, ip, deviceName, false);
let led3: Device = new Device(3, ip, deviceName, true);
let led2: Device = new Device(2, ip, deviceName, false);

(async () => { 
    await delay(3000);

    controller.turnOn(1);
    controller.turnOn(2);
    controller.turnOff(2);
    controller.turnOff(3);
})();

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
