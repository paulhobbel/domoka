import mqtt, { MqttClient } from 'mqtt';
import { IMessage } from './messages/iMessage';
import { ConnectedMessage } from './messages/connectedMessage';
import { ManipulationMessage } from './messages/manipulationMessage';
import { IElectronicComponent } from './components/iElectronicComponent';

export class Device {
    client: MqttClient;
    name: string;
    components: Array<IElectronicComponent>;

    constructor (ip: string, name: string) {
        this.name = name;
        this.client = mqtt.connect('mqtt://' + ip);
        this.components = new Array<IElectronicComponent>();

        this.client.on('connect', () => {
            this.client.subscribe(this.name + '/manipulation');
            
            this.sendConnectedMessage();
        });

        this.client.on('message', (topic, message) => {
            let obj: IMessage = JSON.parse(message.toString());

            switch (topic) {
                case (this.name + '/manipulation'):
                    let manipulationMessage: ManipulationMessage = obj as ManipulationMessage;

                    this.components.forEach((element) => {
                        if(element.id == manipulationMessage.id) {
                            if (manipulationMessage.turnOn) {
                                element.isOn = true;

                                console.log(`[${this.name}] turning on component ${element.id}`);
                                return;
                            } else {
                                element.isOn = false;

                                console.log(`[${this.name}] turning off component ${element.id}`);
                                return;
                            }
                        }
                    });                    
                break;
            }
        });

        this.client.on('error', (error) => {
            console.log(`[${this.name}] error: ${error.name}, message: ${error.message}`);
        });
    }

    addElectronicComponent(electronicComponent: IElectronicComponent) : void{
        this.components.push(electronicComponent);
    }

    private sendConnectedMessage() : void {
        let connectedMessage: IMessage = new ConnectedMessage(this.name, true);
        let connectedMessageJson: string = JSON.stringify(connectedMessage);

        this.client.publish(this.name + '/connected', connectedMessageJson);
    }
}