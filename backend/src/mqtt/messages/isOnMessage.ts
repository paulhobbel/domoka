import { IMessage } from './iMessage';

export class IsOnMessage implements IMessage {
    id: number;
    isOn: boolean;

    constructor(id: number, isOn: boolean) {
        this.id = id;
        this.isOn = isOn;
    }
}