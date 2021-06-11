import { Injectable } from '@angular/core';
import { UserDTO } from '@app/shared/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { BufferAttribute } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ComputeColorsService {
  private originalColors: THREE.BufferAttribute;
  private grayscaleColors: THREE.BufferAttribute;
  private temperatureColors: THREE.BufferAttribute;

  private positions: THREE.BufferAttribute;
  private composedPositions: THREE.BufferAttribute;

  xLimit = [-2, -1, 1];
  yLimit = [-2, -1, 1];
  zLimit = [-4.5, -2.5, -0.5];

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

  getTemperatureColors() {
    if (!this.temperatureColors) {
      this.temperatureColors = this.computeTemperatureColors();
    }
    return this.temperatureColors.clone();
  }

  getOriginalColors() {
    return this.originalColors.clone();
  }

  private computeComposedPositions() {
    const xDistance = this.xLimit[2] - this.xLimit[0];
    const xMove = xDistance - this.xLimit[2];
    const yDistance = this.yLimit[2] - this.yLimit[0];
    const yMove = yDistance - this.yLimit[2];
    const zDistance = this.zLimit[2] - this.zLimit[0];
    const zMove = zDistance - this.zLimit[2];
    const newPositionsNumber = 30;
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

  private computeTemperatureColors() {
    const grayscale = this.getGrayscaleColors();
    const pointArraylenght = 100;
    const startColor = [255, 0, 0];
    const endColor = [255, 170, 0];
    let bufferAttribute;
    let floatArray = new Float32Array(this.composedPositions.array.length);
    floatArray.set(grayscale.array);

    const result = this.computeGradient(startColor, endColor, pointArraylenght);

    for (let index = 0; index < this.composedPositions.count; index++) {
      const x = this.composedPositions.array[index * 3];
      const y = this.composedPositions.array[index * 3 + 1];
      const z = this.composedPositions.array[index * 3 + 2];

      let r = floatArray[index * 3];
      let g = floatArray[index * 3 + 1];
      let b = floatArray[index * 3 + 2];

      let color = [r, g, b];

      if (x <= this.xLimit[1] && y <= this.yLimit[1] && z <= this.zLimit[1]) {
        color = [startColor[0] / 255, startColor[1] / 255, startColor[1] / 255];
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
        color = result[100 - colorIndex -1];
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

      // grayscale.set(color, index * 3);
    }
    bufferAttribute = new BufferAttribute(floatArray, 3);

    return bufferAttribute;
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
