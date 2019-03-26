import { EntitySubscriberInterface, UpdateEvent, InsertEvent, EventSubscriber } from "typeorm";
import { Device } from "../entities";
import Worker from "../worker";

@EventSubscriber()
export class DeviceSubscriber implements EntitySubscriberInterface<Device> {
    listenTo() {
        return Device;
    }

    afterInsert(event: InsertEvent<Device>) {
        console.log('[DeviceSubscriber]: Device Inserted');
        Worker.sendDeviceStatus(event.entity.deviceId, event.entity.status);
    }

    afterUpdate(event: UpdateEvent<Device>) {
        console.log('[DeviceSubscriber]: Device Updated');
        Worker.sendDeviceStatus(event.entity.deviceId, event.entity.status);
    }
}