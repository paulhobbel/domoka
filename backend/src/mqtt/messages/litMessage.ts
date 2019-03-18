import { IMessage } from './iMessage';

export class LitMessage implements IMessage {
    id: number;
    isLit: boolean;

    constructor(id: number, isLit: boolean) {
        this.id = id;
        this.isLit = isLit;
    }
}