import { IMessage } from './iMessage';

export class ConnectedMessage implements IMessage {
    id: number;
    connected: boolean;

    constructor(id: number, connected: boolean) {
        this.id = id;
        this.connected = connected;
    }
}