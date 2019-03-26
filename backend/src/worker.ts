import Mqtt, { MqttClient } from 'mqtt';

class WorkerClient {
    client: MqttClient;

    constructor(private ip: string) {
        console.log(ip);
    }

    /**
     * Connects with the mqtt server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            this.client = Mqtt.connect(`mqtt://${this.ip}`);

            this.client.once('error', reject);
            this.client.once('connect', resolve);
        });
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

export default new WorkerClient(process.env.MQTT_IP || 'localhost');