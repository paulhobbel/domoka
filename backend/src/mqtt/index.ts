import {Controller} from './controller';
import {Led} from './led';

console.log('[src/mqtt/index] Hello world!\n');

// let ip: string = '192.168.178.32'; //Raspberry PI ip
let ip: string = 'test.mosquitto.org:1883'; //Test ip
let device: string = 'device_123';

let controller: Controller = new Controller(ip, device);
let led1: Led = new Led(1, ip, device, false);
let led3: Led = new Led(3, ip, device, true);
let led2: Led = new Led(2, ip, device, false);

(async () => { 
    await delay(3000);

    controller.turnOnLed(1);
    controller.turnOnLed(2);
    controller.turnOffLed(2);
    controller.turnOffLed(3);
})();

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
