import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElasticService } from '@app/core/api/elastic.service';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { ElasticSearchOptions } from '@app/shared/enum/ElasticSearchOptions';
import { HudIDs as HudIDs } from '@app/shared/enum/hudIDs';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-three-dashboard-component',
  templateUrl: './three-dashboard-component.component.html',
  styleUrls: ['./three-dashboard-component.component.scss'],
})
export class ThreeDashboardComponent implements OnInit {
  selectedIndex = 0;
  measuredValue: number;
  modelColorSelection: string;
  indexData: IndexData;
  displayedValue: string;
  disableButtons: boolean = true;

  elasticStartDate:Date = null;
  elasticEndDate: Date = null;
  elasticOption: string = ElasticSearchOptions.LastMeasurement


  constructor(
    private router: Router,
    private elasticService: ElasticService,
    private computeColorsService: ComputeColorsService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.selectModel();
    this.getIndexData(new Date(), null, ElasticSearchOptions.LastMeasurement);

    interval(60000)
      .pipe(
        startWith(0),
        map(() => {
          this.getIndexData(
            this.elasticStartDate,
            this.elasticEndDate,
            this.elasticOption
          );
        })
      )
      .subscribe(
        (res) => {},
        (error) => {}
      );
  }

  selectModel(): void {
    switch (this.router.url) {
      case '/three/nii3':
        this.selectedIndex = 1;
        break;
      case '/three/ghiozdan':
        this.selectedIndex = 2;
        break;
      default:
        break;
    }
  }

  getIndexData(startDate: Date, endDate: Date, option: string) {
    this.computeColorsService.clearColorData();
    return this.elasticService
      .getIndex(startDate, endDate, option)
      .then((indexContent: IndexDTO) => {
        this.indexData = indexContent;
        this.disableButtons = false;
        this.changeDisplayedValue(this.modelColorSelection);
      })
      .catch((err) => {
        this.disableButtons = true;
        console.error(err);
        this.changeModelColors(HudIDs.Original);
        this.computeColorsService.clearColorData();
        this.notification.error('Failed', err.message, {
          nzClass: 'error-notification',
        });
      });
  }

  changeModelColors(event: string) {
    this.modelColorSelection = event;
    this.changeDisplayedValue(event);
  }

  changeIndexDate({ startDate, endDate, rangeOption }) {
    this.elasticStartDate = startDate
    this.elasticEndDate = endDate
    this.elasticOption = rangeOption
    this.getIndexData(startDate, endDate, rangeOption);
  }

  changeDisplayedValue(id: string) {
    switch (id) {
      case HudIDs.Temperature:
        this.displayedValue = this.indexData.BME680['temperature[*C]'] + ' °C';
        break;
      case HudIDs.Vibrations:
        this.displayedValue = this.indexData['Vibration[ms]'] + ' ms';
        break;
      case HudIDs.Humidity:
        this.displayedValue = this.indexData.BME680['humidity[%]'] + ' %';
        break;
      case HudIDs.BME680ECO2:
        this.displayedValue = this.indexData.BME680['eCO2[ppm]'] + ' ppm';
        break;
      case HudIDs.BME680TVOC:
        this.displayedValue = this.indexData.BME680['bTVOC[ppm]'] + ' ppm';
        break;
      case HudIDs.ATM:
        this.displayedValue =
          this.indexData.BME680['atmospheric_pressure[hPa]'] + ' hPa';
        break;
      case HudIDs.IAQ:
        this.displayedValue = this.indexData.BME680.IAQ + '';
        break;
      case HudIDs.SIAQ:
        this.displayedValue = this.indexData.BME680.sIAQ + '';
        break;
      case HudIDs.CCS811ECO2:
        this.displayedValue = this.indexData.CCS811['eCO2[ppm]'] + ' ppm';
        break;
      case HudIDs.CCS811TVOC:
        this.displayedValue = this.indexData.CCS811['eTVOC[ppb]'] + ' ppb';
        break;
      case HudIDs.PM1:
        this.displayedValue = this.indexData.ZH03B['PM1.0[ug/m3]'] + ' ug/m3';
        break;
      case HudIDs.PM25:
        this.displayedValue = this.indexData.ZH03B['PM2.5[ug/m3]'] + ' ug/m3';
        break;
      case HudIDs.PM10:
        this.displayedValue = this.indexData.ZH03B['PM10[ug/m3]'] + ' ug/m3';
        break;

      default:
        this.displayedValue = null;
        break;
    }
  }
}
