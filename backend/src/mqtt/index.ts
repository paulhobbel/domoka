import { Controller } from './controller';
import { Device } from './device';
import { Led } from './components/led';

console.log('[src/mqtt/index] Hello world!\n');

// let ip: string = '192.168.178.32'; //Raspberry PI ip
let ip: string = 'test.mosquitto.org:1883'; //Test ip
let deviceName: string = 'device1';

let controller: Controller = new Controller(ip, deviceName);
let device1: Device = new Device(ip, deviceName);
device1.addElectronicComponent(new Led(0, false));
device1.addElectronicComponent(new Led(1, false));
device1.addElectronicComponent(new Led(2, true));


(async () => { 
    await delay(3000);

    controller.turnOn(0);
    controller.turnOn(1);
    controller.turnOff(1);
    controller.turnOff(2);
})();

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
