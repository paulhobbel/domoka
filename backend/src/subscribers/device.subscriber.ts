import { EntitySubscriberInterface, UpdateEvent, InsertEvent, EventSubscriber } from "typeorm";
import { Device } from "../entities";
import Worker from "../worker";

@EventSubscriber()
export class DeviceSubscriber implements EntitySubscriberInterface<Device> {
    listenTo() {
        return Device;
    }

    afterLoad() {
        console.log('[DeviceSubscriber]: Loaded')
    }

    afterInsert(event: InsertEvent<Device>) {
        console.log('[DeviceSubscriber]: Device Inserted');
    }

    afterUpdate(event: UpdateEvent<Device>) {
        console.log('[DeviceSubscriber]: Device Updated');
        if(event.entity.status)
            Worker.turnOn(event.entity.id);
        else
            Worker.turnOff(event.entity.id);
    }
}