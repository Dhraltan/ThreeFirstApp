import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElasticService } from '@app/core/api/elastic.service';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { ElasticSearchOptions } from '@app/shared/enum/ElasticSearchOptions';
import { HudIDs as HudIDs } from '@app/shared/enum/hudIDs';
import { RoomEnum } from '@app/shared/enum/RoomEnum';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-three-dashboard-component',
  templateUrl: './three-dashboard-component.component.html',
  styleUrls: ['./three-dashboard-component.component.scss'],
})
export class ThreeDashboardComponent implements OnInit, OnDestroy {
  selectedIndex = 0;
  measuredValue: number;
  modelColorSelection: string;
  indexData: IndexData[];
  displayedValue: string[];
  disableButtons: boolean = true;

  elasticStartDate: Date = null;
  elasticEndDate: Date = null;
  elasticOption: string = ElasticSearchOptions.LastMeasurement;

  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private elasticService: ElasticService,
    private computeColorsService: ComputeColorsService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.selectModel();

    this.subscriptions.add(
      interval(60000)
        .pipe(
          startWith(0),
          map(() => {
            if (this.elasticOption == ElasticSearchOptions.LastMeasurement) {
              this.getIndexData(
                this.elasticStartDate,
                this.elasticEndDate,
                this.elasticOption,
                this.getSelectedRoom()
              );
            }
          })
        )
        .subscribe(
          (res) => {},
          (error) => {}
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectModel(): void {
    switch (this.router.url) {
      case '/three/nii3v1':
        this.selectedIndex = 1;
        break;
      case '/three/nii2':
        this.selectedIndex = 2;
        break;
      case '/three/nii3':
        this.selectedIndex = 3;
        break;
      default:
        break;
    }
  }

  getIndexData(startDate: Date, endDate: Date, option: string, room: string[]) {
    this.computeColorsService.clearColorData();
    this.indexData = [];
    this.disableButtons = true;
    room.forEach((roomIndex) => {
      this.elasticService
        .getIndex(startDate, endDate, option, roomIndex)
        .then((indexContent: IndexDTO) => {
          this.indexData.push(indexContent);
          this.disableButtons = false;
          this.changeDisplayedValue(this.modelColorSelection);
        })
        .catch((err) => {
          console.error(err);
          this.changeModelColors(HudIDs.Original);
          this.computeColorsService.clearColorData();
          this.notification.error('Failed', err.message, {
            nzClass: 'error-notification',
          });
        });
    });
  }

  changeModelColors(event: string) {
    this.modelColorSelection = event;
    this.changeDisplayedValue(event);
  }

  changeIndexDate({ startDate, endDate, rangeOption }) {
    this.elasticStartDate = startDate;
    this.elasticEndDate = endDate;
    this.elasticOption = rangeOption;
    this.getIndexData(startDate, endDate, rangeOption, this.getSelectedRoom());
  }

  getSelectedRoom() {
    const selectedRoomIdexes = [];
    switch (this.selectedIndex) {
      case 1:
        selectedRoomIdexes.push(RoomEnum.NII3usa);
        break;

      case 2:
        selectedRoomIdexes.push(RoomEnum.NII2);
        break;
      case 3:
        selectedRoomIdexes.push(RoomEnum.NII3dulap);
        selectedRoomIdexes.push(RoomEnum.NII3usa);
        break;
      default:
        break;
    }
    return selectedRoomIdexes;
  }

  changeDisplayedValue(id: string) {
    this.displayedValue = [];
    this.indexData.forEach((data) => {
      switch (id) {
        case HudIDs.Temperature:
          this.displayedValue.push(data.BME680['temperature[*C]'] + ' °C');
          break;
        case HudIDs.Vibrations:
          this.displayedValue.push(data['Vibration[ms]'] + ' ms');
          break;
        case HudIDs.Humidity:
          this.displayedValue.push(data.BME680['humidity[%]'] + ' %');
          break;
        case HudIDs.BME680ECO2:
          this.displayedValue.push(data.BME680['eCO2[ppm]'] + ' ppm');
          break;
        case HudIDs.BME680TVOC:
          this.displayedValue.push(data.BME680['bTVOC[ppm]'] + ' ppm');
          break;
        case HudIDs.ATM:
          this.displayedValue.push(
            data.BME680['atmospheric_pressure[hPa]'] + ' hPa'
          );
          break;
        case HudIDs.IAQ:
          this.displayedValue.push(data.BME680.IAQ + '');
          break;
        case HudIDs.SIAQ:
          this.displayedValue.push(data.BME680.sIAQ + '');
          break;
        case HudIDs.CCS811ECO2:
          this.displayedValue.push(data.CCS811['eCO2[ppm]'] + ' ppm');
          break;
        case HudIDs.CCS811TVOC:
          this.displayedValue.push(data.CCS811['eTVOC[ppb]'] + ' ppb');
          break;
        case HudIDs.PM1:
          this.displayedValue.push(data.ZH03B['PM1.0[ug/m3]'] + ' ug/m3');
          break;
        case HudIDs.PM25:
          this.displayedValue.push(data.ZH03B['PM2.5[ug/m3]'] + ' ug/m3');
          break;
        case HudIDs.PM10:
          this.displayedValue.push(data.ZH03B['PM10[ug/m3]'] + ' ug/m3');
          break;

        default:
          this.displayedValue = null;
          break;
      }
    });
  }
}
