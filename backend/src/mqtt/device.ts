import mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { IsOnMessage } from './messages/litMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { ManipulationMessage } from './messages/manipulationMessage';

export class Device {
    client: mqtt.MqttClient;
    isOn: boolean;
    id: number;
    name: string;

    constructor (id: number, ip: string, name: string, isOn: boolean) {
        this.name = name;
        this.isOn = isOn;
        this.id = id;
        this.client = mqtt.connect('mqtt://' + ip);

        this.client.on('connect', () => {
            this.client.subscribe(this.name + '/manipulation');
            
            this.sendConnectedMessage();
            this.sendIsOnUpdate();
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            if(obj.id != this.id) return;

            switch (topic) {
                case (this.name + '/manipulation'):
                    let manipulationMessage: ManipulationMessage = obj as ManipulationMessage;

                    if (manipulationMessage.turnOn) {
                        console.log(`[${this.name}] turning on id ${this.id} on device ${this.name}`);
                    } else {
                        console.log(`[${this.name}] turning off id ${this.id} on device ${this.name}`);
                    }

                    this.isOn = manipulationMessage.turnOn;
                break;
            }
        });

        this.client.on('error', (error) => {
            console.log(`[${this.name}] error: ${error.name}, message: ${error.message}`);
        });
    }

    private sendIsOnUpdate() : void {
        let message: IMessage = new IsOnMessage(this.id, this.isOn);
        let messageString: string = JSON.stringify(message);

        this.client.publish(this.name + '/on', messageString);
    }

    private sendConnectedMessage() : void {
        let connectedMessage: IMessage = new ConnectedMessage(this.id, true);
        let connectedMessageJson: string = JSON.stringify(connectedMessage);

        this.client.publish(this.name + '/connected', connectedMessageJson);
    }
}