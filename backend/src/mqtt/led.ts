import mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { LitMessage } from './messages/litMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { ManipulationMessage } from './messages/manipulationMessage';

export class Led {
    client: mqtt.MqttClient;
    lit: boolean;
    id: number;
    device: string;

    constructor (id: number, ip: string, device: string) {
        this.device = device;
        this.lit = false;
        this.id = id;
        this.client = mqtt.connect('mqtt://' + ip);

        this.client.on('connect', () => {
            this.client.subscribe(this.device + '/led/manipulation');
            
            this.sendConnectedMessage();
            this.sendLitUpdate();
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            if(obj.id != this.id) return;

            switch (topic) {
                case (this.device + '/led/manipulation'):
                    let manipulationMessage: ManipulationMessage = obj as ManipulationMessage;

                    if (manipulationMessage.turnOn) {
                        console.log(`[led] turning on led ${this.id} on device ${this.device}`);
                    } else {
                        console.log(`[led] turning off led ${this.id} on device ${this.device}`)
                    }

                    this.lit = manipulationMessage.turnOn;
                break;
            }
        });
    }

    private sendLitUpdate() : void {
        let message: IMessage = new LitMessage(this.id, this.lit);
        let messageString: string = JSON.stringify(message);

        this.client.publish(this.device + '/led/lit', messageString);
    }

    private sendConnectedMessage() : void {
        let connectedMessage: IMessage = new ConnectedMessage(this.id, true);
        let connectedMessageJson: string = JSON.stringify(connectedMessage);

        this.client.publish(this.device + '/led/connected', connectedMessageJson);
    }
}