import Mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ManipulationMessage } from './messages/manipulationMessage';
import { KakuDriver } from './kaku/driver';

class Worker {
    client: MqttClient;
    kakuDriver: KakuDriver;

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

            this.client.subscribe('manipulation');
            this.client.on('message', (topic, message) => {
                let obj: IMessage = JSON.parse(message.toString());

                switch (topic) {
                    case ('manipulation'):
                        let manipulationMessage: ManipulationMessage = obj as ManipulationMessage;
                        
                        if (manipulationMessage.turnOn) {
                            this.kakuDriver.on('A', manipulationMessage.id);
                        } else {
                            this.kakuDriver.off('A', manipulationMessage.id);                        
                        }
                    break;
                }
            });

            this.client.once('error', reject);
            this.client.once('connect', resolve);            
        }).then(() => {
            console.log('[Worker]: Connected');
        })
    }
}

// export default new Worker(process.env.MQTT_HOST || 'localhost');
export default new Worker('test.mosquitto.org:1883');
