import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { hudInformation } from '@app/shared/enum/hudInformation';

@Component({
  selector: 'app-three-hud',
  templateUrl: './three-hud.component.html',
  styleUrls: ['./three-hud.component.scss'],
})
export class ThreeHudComponent implements OnInit, OnChanges {
  hudInformation = hudInformation;
  selectedDate: Date = new Date();

  hideHud: boolean = true;
  selectedUnit: number[] = [1, 0, 0, 0];

  @Input() disableButtons: boolean;

  @Output() onSelectedOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDateSelection: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes) {
    if (
      changes.disableButtons.previousValue == false &&
      changes.disableButtons.currentValue == true
    ) {
      this.selectedUnit = [1, 0, 0, 0];
    }
  }

  changeHudDisplay() {
    this.hideHud = !this.hideHud;
  }

  radioButtonSelection(id: string, event: number) {
    this.onSelectedOption.emit(id);
    this.selectedUnit.forEach((unit, i) => {
      if (event != i) {
        this.selectedUnit[i] = 0;
      }
    });
  }

  onDateChange(value: Date) {
    this.selectedDate = value;
    this.onDateSelection.emit(value);
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return current > new Date() || current < new Date('2021-06-11');
  };
}
