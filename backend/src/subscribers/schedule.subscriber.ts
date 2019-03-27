import { EntitySubscriberInterface, UpdateEvent, EventSubscriber, InsertEvent } from "typeorm";
import { Schedule } from "../entities";
import Worker from "../worker";
@EventSubscriber()
export class ScheduleSubscriber implements EntitySubscriberInterface<Schedule> {
    listenTo() {
        return Schedule;
    }

    afterInsert(event: InsertEvent<Schedule>) {
        console.log('[ScheduleSubscriber]: Schedule Inserted');
        Worker.sendSchedule(event.entity);
    }

    afterUpdate(event: UpdateEvent<Schedule>) {
        console.log('[ScheduleSubscriber]: Schedule Updated');
        Worker.sendSchedule(event.entity);
    }
}