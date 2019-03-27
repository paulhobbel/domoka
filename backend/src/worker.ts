import Mqtt, { MqttClient } from 'mqtt';
import { Schedule, Device } from './entities';
import { getRepository } from 'typeorm';

class WorkerClient {
    private client: MqttClient;
    private subscriptions = new Map<string, (msg: any) => void>();

    constructor(private ip: string) {
    }

    /**
     * Connects with the mqtt server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            console.log(`[WorkerClient]: Connecting to mqtt://${this.ip}`);
            this.client = Mqtt.connect(`mqtt://${this.ip}`);

            this.client.on('message', (topic, payload) => {
                if(this.subscriptions.has(topic))
                    this.subscriptions.get(topic)!(JSON.parse(payload.toString()));
            });
            this.client.once('error', reject);
            this.client.once('connect', resolve);
        }).then(() => {
            console.log('[WorkerClient]: Connected');
        })
    }

    async publish(topic: string, message: any) {
        return new Promise((resolve, reject) => {
            this.client.publish(topic, JSON.stringify(message), (err) => {
                if(err) return reject(err);

                resolve();
            });
        });
    }

    async subscribe<T>(topic: string, callback: (msg: T) => void) {
        return new Promise((resolve, reject) => {
            this.client.subscribe(topic, (err) => {
                if(err) return reject(err);

                resolve();
            });
        }).then(() => {
            console.log(`[Worker]: Added subscription to topic ${topic}`);
            this.subscriptions.set(topic, callback);
        });
    }

    /**
     * Sends a device status to the worker
     * @param id The device id
     * @param turnOn Whether the device should turn on
     */
    async sendDeviceStatus(id: number, turnOn: boolean) {
        return new Promise((resolve, reject) => {
            this.client.publish('manipulation', JSON.stringify({
                id,
                turnOn
            }), (err) => {
                if(err) return reject(err);

                resolve();
            });
        });
    }

    async sendSchedule(schedule: Schedule) {
        return new Promise((resolve, reject) => {
            this.client.publish('schedule', JSON.stringify({
                id: schedule.id,
                beginTime: schedule.beginTime,
                endTime: schedule.endTime,
                status: schedule.status,
                devices: schedule.devices.map(device => device.deviceId)
            }), (err) => {
                if(err) return reject(err);

                resolve();
            });
        });
    }

    async sync() {
        const deviceRepository = getRepository(Device);
        const scheduleRepository = getRepository(Schedule);

        const devices = await deviceRepository.find();
        const schedules = await scheduleRepository.find();

        return await this.publish('sync', {
            devices,
            schedules: schedules.map(schedule => ({
                id: schedule.id,
                beginTime: schedule.beginTime,
                endTime: schedule.endTime,
                status: schedule.status,
                devices: schedule.devices.map(device => device.deviceId)
            }))
        });
    }

    async setup() {
        await this.subscribe('connected', async () => {
            console.log('[Worker]: New worker connected, sending sync');
            await this.sync();
        });
        await this.subscribe('manirequest', async ({ id, status }: { id: number, status: boolean }) => {
            console.log(`[Worker]: Received manirequest, updating device ${id} - status: ${status}`);
            const deviceRepository = getRepository(Device);
    
            const device = await deviceRepository.findOne({ where: { deviceId: id } });
            if(device) {
                device.status = status;
                await device.save();
            }
        })
        await this.sync();
    }
}

export default new WorkerClient(process.env.MQTT_HOST || 'localhost');