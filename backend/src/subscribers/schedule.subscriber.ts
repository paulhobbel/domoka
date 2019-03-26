import { EntitySubscriberInterface, UpdateEvent } from "typeorm";
import { Schedule } from "../entities";

export class ScheduleSubscriber implements EntitySubscriberInterface<Schedule> {
    listenTo() {
        return Schedule;
    }

    afterUpdate(event: UpdateEvent<Schedule>) {
        // event.entity
    }
}