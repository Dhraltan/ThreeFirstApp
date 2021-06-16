import { Injectable } from '@angular/core';
import { BufferAttribute } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ComputeColorsService {
  private originalColors: THREE.BufferAttribute;
  private grayscaleColors: THREE.BufferAttribute;
  private vibrationsColors: THREE.BufferAttribute;
  private temperatureColors: THREE.BufferAttribute;
  private humidityColors: THREE.BufferAttribute;
  private atmosfericColors: THREE.BufferAttribute;
  private bmeECO2Colors: THREE.BufferAttribute;
  private bmeTVOCColors: THREE.BufferAttribute;
  private iaqColors: THREE.BufferAttribute;
  private siaqColors: THREE.BufferAttribute;
  private ccsECO2Colors: THREE.BufferAttribute;
  private ccsTVOCColors: THREE.BufferAttribute;
  private pm1Colors: THREE.BufferAttribute;
  private pm25Colors: THREE.BufferAttribute;
  private pm10Colors: THREE.BufferAttribute;

  private positions: THREE.BufferAttribute;
  private composedPositions: THREE.BufferAttribute;

  private xLimit = [-2, -1, 1];
  private yLimit = [-2, -1, 1];
  private zLimit = [-4.5, -2.5, -0.5];

  private unitLimits = {
    vibrationsColors: { lowLimit: 17, ideal: 20, highLimit: 23 },
    temperatureColors: { lowLimit: 17, ideal: 20, highLimit: 23 },
    humidityColors: { lowLimit: 35, ideal: 45, highLimit: 55 },
    atmosfericColors: { lowLimit: 940, ideal: 960, highLimit: 980 },
    ECO2Colors: { lowLimit: 250, ideal: 500, highLimit: 1500 },
    bmeTVOCColors: { lowLimit: 0.09, ideal: 0.15, highLimit: 0.31 },
    iaqColors: { lowLimit: 0, ideal: 50, highLimit: 150 },
    siaqColors: { lowLimit: 0, ideal: 50, highLimit: 150 },
    ccsTVOCColors: { lowLimit: 0, ideal: 250, highLimit: 500 },
    pm1Colors: { lowLimit: 0, ideal: 3, highLimit: 50 },
    pm25Colors: { lowLimit: 0, ideal: 3, highLimit: 35 },
    pm10Colors: { lowLimit: 0, ideal: 3, highLimit: 40 },
  };

  constructor() {}

  setOriginalColors(originalColors: THREE.BufferAttribute) {
    this.originalColors = originalColors.clone();
  }

  setPositions(positions: THREE.BufferAttribute) {
    this.positions = positions.clone();
  }

  getPositions(): THREE.BufferAttribute {
    return this.positions.clone();
  }

  getComposedPositions(): THREE.BufferAttribute {
    if (!this.composedPositions) {
      this.composedPositions = this.computeComposedPositions();
    }
    return this.composedPositions.clone();
  }

  getGrayscaleColors() {
    if (!this.grayscaleColors) {
      this.grayscaleColors = this.computeGrayscaleColors();
    }
    return this.grayscaleColors.clone();
  }

  getTemperatureColors(measuredValue) {
    if (!this.temperatureColors) {
      this.temperatureColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.temperatureColors
      );
    }
    return this.temperatureColors.clone();
  }

  getHumidityColors(measuredValue) {
    if (!this.humidityColors) {
      this.humidityColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.humidityColors
      );
    }
    return this.humidityColors.clone();
  }

  getVibrationsColor(measuredValue) {
    if (!this.vibrationsColors) {
      this.vibrationsColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.vibrationsColors
      );
    }
    return this.vibrationsColors.clone();
  }

  getAtmosfericColors(measuredValue) {
    if (!this.atmosfericColors) {
      this.atmosfericColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.atmosfericColors
      );
    }
    return this.atmosfericColors.clone();
  }

  getBMEECO2Colors(measuredValue) {
    if (!this.bmeECO2Colors) {
      this.bmeECO2Colors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.ECO2Colors
      );
    }
    return this.bmeECO2Colors.clone();
  }

  getBMETVOCColors(measuredValue) {
    if (!this.bmeTVOCColors) {
      this.bmeTVOCColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.bmeTVOCColors
      );
    }
    return this.bmeTVOCColors.clone();
  }

  getIAQColors(measuredValue) {
    if (!this.iaqColors) {
      this.iaqColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.iaqColors
      );
    }
    return this.iaqColors.clone();
  }

  getSIAQColors(measuredValue) {
    if (!this.siaqColors) {
      this.siaqColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.siaqColors
      );
    }
    return this.siaqColors.clone();
  }

  getCCSECO2Colors(measuredValue) {
    if (!this.ccsECO2Colors) {
      this.ccsECO2Colors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.ECO2Colors
      );
    }
    return this.ccsECO2Colors.clone();
  }

  getCCSTVOCColors(measuredValue) {
    if (!this.ccsTVOCColors) {
      this.ccsTVOCColors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.ccsTVOCColors
      );
    }
    return this.ccsTVOCColors.clone();
  }

  getPM1Colors(measuredValue) {
    if (!this.pm1Colors) {
      this.pm1Colors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.pm1Colors
      );
    }
    return this.pm1Colors.clone();
  }

  getPM25Colors(measuredValue) {
    if (!this.pm25Colors) {
      this.pm25Colors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.pm25Colors
      );
    }
    return this.pm25Colors.clone();
  }

  getPM10Colors(measuredValue) {
    if (!this.pm10Colors) {
      this.pm10Colors = this.computeSensorColors(
        measuredValue,
        this.unitLimits.pm10Colors
      );
    }
    return this.pm10Colors.clone();
  }

  getOriginalColors() {
    return this.originalColors.clone();
  }

  clearColorData() {
    this.vibrationsColors = null;
    this.temperatureColors = null;
    this.humidityColors = null;
    this.atmosfericColors = null;
    this.bmeECO2Colors = null;
    this.bmeTVOCColors = null;
    this.iaqColors = null;
    this.siaqColors = null;
    this.ccsECO2Colors = null;
    this.ccsTVOCColors = null;
    this.pm1Colors = null;
    this.pm25Colors = null;
    this.pm10Colors = null;
  }

  private computeComposedPositions() {
    const xDistance = this.xLimit[2] - this.xLimit[0];
    const xMove = xDistance - this.xLimit[2];
    const yDistance = this.yLimit[2] - this.yLimit[0];
    const yMove = yDistance - this.yLimit[2];
    const zDistance = this.zLimit[2] - this.zLimit[0];
    const zMove = zDistance - this.zLimit[2];
    const newPositionsNumber = 25;
    const newPositionsArray: number[] = [];

    for (let x = 1; x < newPositionsNumber; x++) {
      for (let y = 1; y < newPositionsNumber; y++) {
        for (let z = 1; z < newPositionsNumber; z++) {
          const newX = Math.random() * xDistance - xMove;
          const newY = Math.random() * yDistance - yMove;
          const newZ = Math.random() * zDistance - zMove;
          newPositionsArray.push(newX, newY, newZ);
        }
      }
    }

    let floatArray = new Float32Array(
      this.positions.array.length + newPositionsArray.length
    );
    floatArray.set(this.positions.array);
    floatArray.set(newPositionsArray, this.positions.array.length);

    const bufferAttribute = new BufferAttribute(floatArray, 3);

    return bufferAttribute.clone();
  }

  private computeGrayscaleColors() {
    const grayscaleColors = this.originalColors.clone();
    for (let colorIndex = 0; colorIndex < grayscaleColors.count; colorIndex++) {
      const r = grayscaleColors.array[colorIndex * 3];
      const g = grayscaleColors.array[colorIndex * 3 + 1];
      const b = grayscaleColors.array[colorIndex * 3 + 2];
      let lum = 0.299 * r + 0.587 * g + 0.114 * b;
      grayscaleColors.set([lum, lum, lum], colorIndex * 3);
    }
    this.computeComposedPositions();
    return grayscaleColors;
  }

  private computeSensorColors(measuredValue: number, unitLimits) {
    const grayscale = this.getGrayscaleColors();
    const pointArraylenght = 1000;

    let bufferAttribute;
    let floatArray = new Float32Array(this.composedPositions.array.length);
    floatArray.set(grayscale.array);

    let gradientColors = this.computeGradientColors(measuredValue, unitLimits);

    const startColor = gradientColors.startColor;
    const endColor = gradientColors.endColor;

    const result = this.computeGradient(startColor, endColor, pointArraylenght);


    for (
      let index = this.positions.count;
      index < this.composedPositions.count;
      index++
    ) {
      const x = this.composedPositions.array[index * 3];
      const y = this.composedPositions.array[index * 3 + 1];
      const z = this.composedPositions.array[index * 3 + 2];

      let r = floatArray[index * 3];
      let g = floatArray[index * 3 + 1];
      let b = floatArray[index * 3 + 2];

      let color = [r, g, b];

      if (x <= this.xLimit[2] && y <= this.yLimit[1] && z <= this.zLimit[1]) {
        color = [startColor[0] / 255, startColor[1] / 255, startColor[2] / 255];
      }

      if (
        x >= this.xLimit[0] &&
        x <= this.xLimit[1] &&
        y <= this.yLimit[2] &&
        y >= this.yLimit[0] &&
        z <= this.zLimit[2] &&
        z >= this.zLimit[0]
      ) {
        let colorIndex = Math.floor(
          ((x - this.xLimit[0]) * pointArraylenght) /
            (this.xLimit[1] - this.xLimit[0])
        );
        color = result[pointArraylenght - colorIndex - 1];
      }

      if (
        y >= this.yLimit[1] &&
        y <= this.yLimit[2] &&
        x <= this.xLimit[2] &&
        x >= this.xLimit[0] &&
        z <= this.zLimit[2] &&
        z >= this.zLimit[0]
      ) {
        let colorIndex = Math.floor(
          ((y - this.yLimit[1]) * pointArraylenght) /
            (this.yLimit[2] - this.yLimit[1])
        );
        if (color < result[colorIndex]) {
          color = result[colorIndex];
        }
      }

      if (
        z >= this.zLimit[1] &&
        z <= this.zLimit[2] &&
        x <= this.xLimit[2] &&
        x >= this.xLimit[0] &&
        y >= this.yLimit[0] &&
        y <= this.yLimit[2]
      ) {
        let colorIndex = Math.floor(
          ((z - this.zLimit[1]) * pointArraylenght) /
            (this.zLimit[2] - this.zLimit[1])
        );
        if (color < result[colorIndex]) {
          color = result[colorIndex];
        }
      }

      floatArray.set(color, index * 3);
    }
    bufferAttribute = new BufferAttribute(floatArray, 3);

    return bufferAttribute;
  }

  private computeGradientColors(measuredValued, unitLimits) {
    let startColor = [0, 0, 0];
    let endColor = [0, 0, 0];

    if (measuredValued < unitLimits.lowLimit) {
      if (measuredValued < 0) {
        return { startColor: [0, 0, 255], endColor: [0, 0, 255] };
      }
      const relativeValue = measuredValued / unitLimits.lowLimit;
      const colorWhenLow = Math.ceil((2 - relativeValue) * 127);
      const colorWhenHigh = Math.ceil(relativeValue * 120);

      startColor = [0, colorWhenHigh, colorWhenLow];
      endColor = [0, colorWhenHigh * 2, colorWhenLow];
    } else if (measuredValued > unitLimits.highLimit) {
      if (measuredValued > unitLimits.highLimit * 2) {
        return { startColor: [255, 0, 0], endColor: [255, 0, 0] };
      }

      const relativeValue = (measuredValued - unitLimits.highLimit)/unitLimits.highLimit

      startColor = [200, (1-relativeValue)*127, 0];
      endColor = [255, (1-relativeValue) * 255, 0];
    } else {

      if (measuredValued < unitLimits.ideal) {
        const maxDistance = unitLimits.ideal - unitLimits.lowLimit;
        const measuredDistance = unitLimits.ideal - measuredValued;
        const relativeValue = (maxDistance - measuredDistance) / maxDistance;
        startColor = [0, 200, (1-relativeValue) * 127];
        endColor = [0, 255, (1-relativeValue) * 255];
      } else {
        const maxDistance = unitLimits.highLimit - unitLimits.ideal;
        const measuredDistance = unitLimits.highLimit - measuredValued;
        const relativeValue = (maxDistance - measuredDistance) / maxDistance;
        startColor = [ relativeValue * 127, 255,0];
        endColor = [ relativeValue * 255, 255,0];
      }
    }

    return { startColor: startColor, endColor: endColor };
  }

  private computeGradient(
    startColor: number[],
    endColor: number[],
    gradientSize: number
  ): number[][] {
    let alpha = 0.0;

    const result: number[][] = [];

    for (let i = 0; i < gradientSize; i++) {
      const gradientColor: number[] = [];
      alpha += 1.0 / gradientSize;

      gradientColor[0] = endColor[0] * alpha + (1 - alpha) * startColor[0];
      gradientColor[1] = endColor[1] * alpha + (1 - alpha) * startColor[1];
      gradientColor[2] = endColor[2] * alpha + (1 - alpha) * startColor[2];

      result.push([
        gradientColor[0] / 255,
        gradientColor[1] / 255,
        gradientColor[2] / 255,
      ]);
    }

    return result;
  }
}
