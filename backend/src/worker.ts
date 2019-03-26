import Mqtt, { MqttClient } from 'mqtt';

class WorkerClient {
    client: MqttClient;

    constructor(private ip: string) {
    }

    /**
     * Connects with the mqtt server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            console.log(`[WorkerClient]: Connecting to mqtt://${this.ip}`);
            this.client = Mqtt.connect(`mqtt://${this.ip}`);

            this.client.once('error', reject);
            this.client.once('connect', resolve);
        }).then(() => {
            console.log('[WorkerClient]: Connected');
        })
    }

    /**
     * Sends a device status to the worker
     * @param id The device id
     * @param turnOn Whether the device should turn on
     */
    sendDeviceStatus(id: number, turnOn: boolean) {
        return new Promise((resolve, reject) => {
            this.client.publish('manipulation', JSON.stringify({
                id,
                turnOn
            }), (err) => {
                if(err) return reject(err);

                resolve();
            });
        });
    }
}

export default new WorkerClient(process.env.MQTT_HOST || 'localhost');