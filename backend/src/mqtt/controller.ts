import mqtt, { MqttClient, Client } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { IsOnMessage } from './messages/isOnMessage';
import { ManipulationMessage } from './messages/manipulationMessage';

export class Controller {
    client: mqtt.MqttClient;
    deviceName: string;

    constructor(ip: string, deviceName: string) { 
        this.client = mqtt.connect('mqtt://' + ip);
        this.deviceName = deviceName;

        this.client.on('connect', () => {
            this.client.subscribe(this.deviceName + '/connected');
            this.client.subscribe(this.deviceName + '/on');
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            switch (topic) {
                case (this.deviceName + '/connected'):
                    let connectedMessage: ConnectedMessage = obj as ConnectedMessage;

                    console.log(`[controller] received device id: ${connectedMessage.id} connection status: ${connectedMessage.connected}`);
                break;
                case (this.deviceName + '/on'):
                    let isOnMessage: IsOnMessage = obj as IsOnMessage;

                    console.log(`[controller] received device id: ${isOnMessage.id} on status: ${isOnMessage.isOn}`);
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

        this.client.publish(this.deviceName + '/manipulation', messageString);
    }
}
