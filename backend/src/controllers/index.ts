import { AuthController } from "./auth.controller";
import { DeviceController } from "./device.controller";
import { MiscController } from "./misc.controller";
import { ScheduleController } from "./schedule.controller";
import { UserController } from "./user.controller";
import { PowerController } from "./power.controller";

export default {
    misc: new MiscController(),
    auth: new AuthController(),
    schedule: new ScheduleController(),
    device: new DeviceController(),
    user: new UserController(),
    power: new PowerController()
}