import { AuthController } from "./auth.controller";
import { DeviceController } from "./device.controller";
import { MiscController } from "./misc.controller";

export default {
    misc: new MiscController(),
    auth: new AuthController(),
    device: new DeviceController()
}