import rpio from 'rpio';

const HIGH  = rpio.HIGH;
const LOW   = rpio.LOW;

export class KakuDriver {

  constructor(
        private pin = 11, 
        private periodusec = 260,
        private repeats = 7,
        private pulsewidth = 5) {
    rpio.open(pin, rpio.OUTPUT, LOW);
  }

  on(address: number, unit: number) {
    this.transmit(address, unit, true);
  }

  off(address: number, unit: number) {
    this.transmit(address, unit, false);
  }

  dim(address: number, unit: number, level: number) {
    this.transmit(address, unit, 'dim', level);
  }

  groupOn(address: number) {
    this.group(address, true);
  }

  groupOff(address: number) {
    this.group(address, false);
  }

  group(address: number, on: boolean) {
    this.transmit(address, 0, on, true);
  }

  transmit(address: number, unit: number, value: boolean | 'dim', groupOrLevel?: boolean | number) {
    let dimming = value === 'dim';

    // Build data packet.
    let packet = '';

    // 26-bit address
    packet += encode(address, 26);
    
    // Handle dimming command.
    if (dimming) {
      packet += '02';
    } else {
      packet += String(Number(!!groupOrLevel));
      packet += String(Number(!!value));
    }

    // 4-bit unit number.
    packet += encode(unit, 4);

    // Add dim-level if we're dimming.
    if (dimming) {
      packet += encode(groupOrLevel, 4);
    }

    let pin        = this.pin;
    let periodusec = this.periodusec;
    let pulsewidth = this.pulsewidth;
    for (let i = 0; i < this.repeats; i++) {
      this.sendStartPulse();
      packet.split('').forEach(bit => {
        switch(bit) {
          case '0':
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec);
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec * pulsewidth);
            break;
          case '1':
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec * pulsewidth);
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec);
            break;
          case '2':
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec);
            rpio.write(pin, HIGH);
            rpio.usleep(periodusec);
            rpio.write(pin, LOW);
            rpio.usleep(periodusec);
            break;
        }
      });
      this.sendStopPulse();
    }
  }

  private sendStartPulse() {
    rpio.write(this.pin, HIGH);
    rpio.usleep(this.periodusec);
    rpio.write(this.pin, LOW);
    rpio.usleep(this.periodusec * 10 + (this.periodusec >> 1)); // Actually 10.5T insteat of 10.44T. Close enough.
  }

  private sendStopPulse() {
    rpio.write(this.pin, HIGH);
    rpio.usleep(this.periodusec);
    rpio.write(this.pin, LOW);
    rpio.usleep(this.periodusec * 40);
  }
}

function encode(value: any, len: number) {
  let n = value.toString(2);
  return new Array(len + 1).join('0').substr(n.length) + n;
}