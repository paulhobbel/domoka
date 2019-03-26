import { IMessage } from './iMessage';

export class ConnectedMessage implements IMessage {
    connected: boolean;

    constructor(connected: boolean) {
        this.connected = connected;
    }
}