import { getRepository } from 'typeorm';
import { Device, DeviceType } from '../entities';

export class PowerAlgorithm {
  private readonly cost = 0.0002292;
  private totalWatt = 0;
  private totalCost = 0;

    async calc () {
      const res = getRepository(Device);
      let tempWatt = 0;
      const objs = await res.find();

      for(const item of objs) {
        if (item.status){
          tempWatt++;
        }
      }

      this.totalCost += this.cost * 1/60 * tempWatt;
      this.totalWatt += tempWatt;
    }
};
