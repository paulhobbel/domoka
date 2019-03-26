import { Controller } from './controller';

console.log('[src/mqtt/index] Hello world!\n');

let ip: string = '192.168.1.200'; //Raspberry PI ip
// let ip: string = 'test.mosquitto.org:1883'; //Test ip
let deviceName: string = 'kaku';

let controller: Controller = new Controller(ip);

(async () => { 
    while(true){
        await delay(3000);
        controller.turnOn(0);
        await delay(3000);
        controller.turnOff(0);
    }
})();

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
