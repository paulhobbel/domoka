import { IMessage } from './iMessage';

export class ConnectedMessage implements IMessage {
    name: string;
    connected: boolean;

    constructor(name: string, connected: boolean) {
        this.name = name;
        this.connected = connected;
    }
}