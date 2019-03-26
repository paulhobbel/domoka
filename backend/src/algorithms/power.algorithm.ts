import { getRepository } from 'typeorm';
import Boom from 'boom';
import { Device, DeviceType } from '../entities';
import { Power } from '../entities';

export class PowerAlgorithm {
  private readonly cost = 0.0002292;
  totalWatt = 0;
  totalCost = 0;
  totalMoneySaved = 0;
  totalPowerSaved = 0;
  lastWatt = 0;

    async calcTotal () {
      const res = getRepository(Device);
      const powerRepositiry = getRepository(Power);
      const power = await powerRepositiry.findOne();
      if(!power)
        throw Boom.badRequest();
      
      let tempWatt = 0;
      const objs = await res.find();
      
      for(const item of objs) {
        if (item.status) {
          tempWatt += (item.watt / 60);
        }
      }

      power.moneyCost+= this.cost * 1/60 * tempWatt;
      this.totalCost += this.cost * 1/60 * tempWatt;
      power.powerUsed += tempWatt;
      this.totalWatt += tempWatt;
      this.lastWatt = tempWatt;

      await power.save();
    }

    async calcSavings () {
      const p = getRepository(Power);
      const power = await p.findOne();
      if(!power)
        throw Boom.badRequest();
      power.powerSavings += this.lastWatt/this.getRandomArbitrary(90, 120);     
      this.totalPowerSaved += this.lastWatt/this.getRandomArbitrary(90, 120);
      power.moneySavings = this.totalPowerSaved * this.cost;
      this.totalMoneySaved = this.totalPowerSaved*this.cost;

      await power.save();
    }

    getRandomArbitrary(min:number, max:number) {
      return Math.random() * (max - min) + min;
    }
}

export default new PowerAlgorithm;

