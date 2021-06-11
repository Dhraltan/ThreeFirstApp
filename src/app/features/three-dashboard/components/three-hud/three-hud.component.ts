import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { hudInformation } from '@app/shared/enum/hudInformation';

@Component({
  selector: 'app-three-hud',
  templateUrl: './three-hud.component.html',
  styleUrls: ['./three-hud.component.scss'],
})
export class ThreeHudComponent implements OnInit {
  hudInformation = hudInformation;

  hideHud: boolean = true;
  selectedUnit: number[] = [1, 0, 0, 0];

  @Output() onSelectedOption: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  changeHudDisplay() {
    this.hideHud = !this.hideHud;
  }

  radioButtonSelection(id: string, event: number) {
    this.onSelectedOption.emit(id);
    this.selectedUnit.forEach((unit, i) => {
      console.log('event', event)
      console.log('i', i)
      if (event != i) {
        this.selectedUnit[i] = 0;
      }
    });
  }
}
