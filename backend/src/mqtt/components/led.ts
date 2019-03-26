import { IElectronicComponent } from "./iElectronicComponent";

export class Led implements IElectronicComponent{
    id: number;
    isOn: boolean;
    callback: Function;

    constructor(id: number, isOn: boolean, callback: Function) {
        this.id = id;
        this.isOn = isOn;
        this.callback = callback;
    }
}