import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ElasticSearchOptions } from '@app/shared/enum/ElasticSearchOptions';
import { hudInformation } from '@app/shared/enum/hudInformation';

@Component({
  selector: 'app-three-hud',
  templateUrl: './three-hud.component.html',
  styleUrls: ['./three-hud.component.scss'],
})
export class ThreeHudComponent implements OnInit, OnChanges {
  hudInformation = hudInformation;
  selectedStartDate: Date = new Date();
  selectedEndDate: Date = new Date();
  selectedDateOption: string = '0';

  selectedDateRange;

  hideHud: boolean = true;
  selectedUnit: number[] = [1, 0, 0, 0];

  @Input() disableButtons: boolean;

  @Output() onSelectedOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDateSelection: EventEmitter<{
    startDate: Date;
    endDate: Date;
    rangeOption: string;
  }> = new EventEmitter<{
    startDate: Date;
    endDate: Date;
    rangeOption: string;
  }>();

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

  onDateChange(event?: string) {
    if (event == ElasticSearchOptions.RangeAverage) {
      return;
    }
    this.onDateSelection.emit({
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      rangeOption: this.selectedDateOption,
    });
  }

  disabledDate = (current: Date): boolean => {
    return current > new Date() || current < new Date('2021-06-11');
  };
}
