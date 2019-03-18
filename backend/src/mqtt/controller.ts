import mqtt, { MqttClient, Client } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { LitMessage } from './messages/litMessage';
import { ManipulationMessage } from './messages/manipulationMessage';

export class Controller {
    client: mqtt.MqttClient;
    device: string;

    constructor(ip: string, device: string) { 
        this.client = mqtt.connect('mqtt://' + ip);
        this.device = device;

        this.client.on('connect', () => {
            this.client.subscribe(this.device + '/led/connected');
            this.client.subscribe(this.device + '/led/lit');
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            switch (topic) {
                case (this.device + '/led/connected'):
                    let connectedMessage: ConnectedMessage = obj as ConnectedMessage;

                    console.log(`[controller] received led ${connectedMessage.id} connection status: ${connectedMessage.connected}`);
                break;
                case (this.device + '/led/lit'):
                    let litMessage: LitMessage = obj as LitMessage;

                    console.log(`[controller] received led ${litMessage.id} isLit status: ${litMessage.isLit}`);
                break;
            }
        });
    }

    turnOnLed(id: number) : void {
        this.sendManipulationMessage(id, true);
    }

    turnOffLed(id: number) : void {
        this.sendManipulationMessage(id, false);
    }

    private sendManipulationMessage(id: number, turnOn: boolean) {
        let message: IMessage = new ManipulationMessage(id, turnOn);
        let messageString: string = JSON.stringify(message);

        this.client.publish(this.device + '/led/manipulation', messageString);
    }
}
