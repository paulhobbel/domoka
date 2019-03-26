import { getRepository } from 'typeorm';
import { Device, DeviceType } from '../entities';

export class PowerAlgorithm {
  private readonly cost = 0.0002292;
  totalWatt = 0;
  totalCost = 0;
  totalMoneySaved = 0;
  totalPowerSaved = 0;

    async calc () {
      const res = getRepository(Device);
      let tempWatt = 0;
      const objs = await res.find();

      for(const item of objs) {
        if (item.status){
          tempWatt += (item.watt / 60);
        }
      }

      this.totalCost += this.cost * 1/60 * tempWatt;
      this.totalWatt += tempWatt;
    }

    async calcSavings () {
      
    }
};
