import mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { ManipulationMessage } from './messages/manipulationMessage';

export class Controller {
    client: MqttClient;

    constructor(ip: string) { 
        this.client = mqtt.connect('mqtt://' + ip);

        this.client.on('connect', () => {
            this.client.subscribe('connected');
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            switch (topic) {
                case ('connected'):
                    let connectedMessage: ConnectedMessage = obj as ConnectedMessage;

                    console.log(`[controller] received connection status: ${connectedMessage.connected}`);
                break;
            }
        });

        this.client.on('error', (error) => {
            console.log(`[controller] error: ${error.name}, message: ${error.message}`);
        });
    }

    turnOn(id: number) : void {
        this.sendManipulationMessage(id, true);
    }

    turnOff(id: number) : void {
        this.sendManipulationMessage(id, false);
    }

    private sendManipulationMessage(id: number, turnOn: boolean) {
        let message: IMessage = new ManipulationMessage(id, turnOn);
        let messageString: string = JSON.stringify(message);

        this.client.publish('manipulation', messageString);
    }
}
