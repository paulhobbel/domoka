import { IElectronicComponent } from "./iElectronicComponent";

export class Led implements IElectronicComponent{
    id: number;
    isOn: boolean;

    constructor(id: number, isOn: boolean) {
        this.id = id;
        this.isOn = isOn;
    }
}