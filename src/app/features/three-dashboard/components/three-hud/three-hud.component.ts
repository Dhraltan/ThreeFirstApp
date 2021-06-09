import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-hud',
  templateUrl: './three-hud.component.html',
  styleUrls: ['./three-hud.component.scss'],
})
export class ThreeHudComponent implements OnInit {
  hudInformation = {
    'Basic views:': ['Normal color view', 'Grayscale view', 'Vibrations'],
    'Measured by BME680:': [
      'Temperature',
      'Atmospheric pressure',
      'Estimated CO2',
      'Total concentration of VOC',
      'IAQ',
      'Subjective IAQ',
    ],
    'Measured by CCS811': ['Estimated CO2', 'Total concentration of VOC'],
    'Measured by ZH03B:': [
      'Particle Matter of 1.0ug',
      'Particle Matter of 2.5ug',
      'Particle Matter of 10ug',
    ],
  };

  hideHud: boolean = true;
  selectedUnit: number[] = [0, 0, 0, 0];

  constructor() {}

  ngOnInit(): void {
    this.selectedUnit[0] = 1;
  }

  changeHudDisplay() {
    this.hideHud = !this.hideHud;
  }

  clearOtherRadioSelection(index) {
    console.log(this.selectedUnit);
    this.selectedUnit.forEach((unit, i) => {
      if (index != i) {
        this.selectedUnit[i] = 0;
      }
    });
  }
}
