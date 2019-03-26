import Mqtt, { MqttClient } from 'mqtt';

class WorkerClient {
    client: MqttClient;

    constructor(private ip: string) {
        console.log(ip);
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.client = Mqtt.connect(`mqtt://${this.ip}`);

            this.client.once('error', reject);
            this.client.once('connect', resolve);
        });
    }

    async turnOn(id: number) {
        return await this.sendManipulation(id, true);
    }

    async turnOff(id: number) {
        return await this.sendManipulation(id, false);
    }

    private sendManipulation(id: number, turnOn: boolean) {
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