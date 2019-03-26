import { KakuDriver } from "./driver"

console.log('[src/kaku/index] Hello world!\n');

(async () => {
    let kakuDriver: KakuDriver = new KakuDriver();

    for(let i = 0; i < 3; i++){
        kakuDriver.off('A', 0);
        kakuDriver.off('A', 1);
        await delay(500);
        kakuDriver.on('A', 0);
        kakuDriver.on('A', 1);
        await delay(500);
    }

    kakuDriver.off('A', 0);
    kakuDriver.off('A', 1);
})();

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}