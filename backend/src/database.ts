import { createConnection } from 'typeorm';
import path from 'path';

import { Device, User } from './entities';

export const connect = async () => createConnection({
    type: 'sqlite',
    database: path.join(process.cwd(), 'database/domka.sqlite'),
    synchronize: true,
    logging: false,
    entities: [Device, User],
});