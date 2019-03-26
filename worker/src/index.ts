import worker from "./worker";

console.log('[worker/src/index.ts]: Hello world!\n');

(async () => {
    await worker.connect();
})();