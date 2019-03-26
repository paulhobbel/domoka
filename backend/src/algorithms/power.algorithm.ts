import { getRepository } from 'typeorm';
import { Device, DeviceType } from '../entities';

class PowerAlgorithm {
  private readonly cost = 0.0002292;
  totalWatt = 0;
  totalCost = 0;
  totalMoneySaved = 0;
  totalPowerSaved = 0;
  lastWatt = 0;

    async calcTotal () {
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
      this.lastWatt = tempWatt;
    }

    calcSavings () {
      this.totalPowerSaved += this.lastWatt/this.getRandomArbitrary(90, 120);
      this.totalMoneySaved = this.totalPowerSaved*this.cost;
    }

    getRandomArbitrary(min:number, max:number) {
      return Math.random() * (max - min) + min;
    }
};

export default new PowerAlgorithm;
