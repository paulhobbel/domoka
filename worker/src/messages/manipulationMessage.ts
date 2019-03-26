import { IMessage } from './iMessage';

export class ManipulationMessage implements IMessage {
    id: number;
    turnOn: boolean;

    constructor(id: number, turnOn: boolean) {
        this.id = id;
        this.turnOn = turnOn;
    }
}