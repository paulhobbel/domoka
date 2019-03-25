import { AuthController } from "./auth.controller";
import { DeviceController } from "./device.controller";
import { MiscController } from "./misc.controller";
import { UserController } from "./user.controller";

export default {
    misc: new MiscController(),
    auth: new AuthController(),
    device: new DeviceController(),
    user: new UserController()
}