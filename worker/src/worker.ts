import 'dotenv/config';

import Mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ManipulationMessage } from './messages/manipulationMessage';
import { KakuDriver } from './kaku/driver';

class Worker {
    client: MqttClient;
    kakuDriver: KakuDriver;
    subscriptions = new Map<string, (msg: any) => void>();

    constructor(private ip: string) {
        this.kakuDriver = new KakuDriver();
    }

    /**
     * Connects with the mqtt server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            console.log(`[Worker]: Connecting to mqtt://${this.ip}`);
            this.client = Mqtt.connect(`mqtt://${this.ip}`);

            this.client.subscribe('schedule');
            this.client.subscribe('manipulation');

            this.client.on('message', (topic, message) => {
                if(this.subscriptions.has(topic)) {
                    this.subscriptions.get(topic)!(JSON.parse(message.toString()));
                }
            });

            this.client.once('error', reject);
            this.client.once('connect', resolve);            
        }).then(() => {
            console.log('[Worker]: Connected');
            this.publish('connected', {connected: true});
        });
    }

    async publish(topic: string, message: any) {
        return new Promise((resolve, reject) => {
            this.client.publish(topic, JSON.stringify(message), (err) => {
                if(err) return reject(err);

                resolve();
            });
        });
    }

    async subscribe<T>(topic: string, callback: (msg: T) => void) {
        return new Promise((resolve, reject) => {
            this.client.subscribe(topic, (err) => {
                if(err) return reject(err);

                resolve();
            });
        }).then(() => {
            console.log(`[Worker]: Added subscription to topic ${topic}`);
            this.subscriptions.set(topic, callback);
        });
    }
}

export default new Worker(process.env.MQTT_HOST || 'localhost');