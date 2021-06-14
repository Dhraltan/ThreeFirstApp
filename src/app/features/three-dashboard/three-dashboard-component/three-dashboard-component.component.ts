import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElasticService } from '@app/core/api/elastic.service';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { HuhIDs } from '@app/shared/enum/hudIDs';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';

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
  constructor(
    private router: Router,
    private elasticService: ElasticService,
    private computeColorsService: ComputeColorsService
  ) {}

  async ngOnInit() {
    this.selectModel();
    this.indexData = (
      (await this.getIndexData()) as IndexDTO
    ).hits.hits[0]._source;
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

  async getIndexData() {
    this.computeColorsService.clearColorData();
    return this.elasticService.getIndex().catch((err) => {
      console.error(err);
    });
  }

  changeModelColors(event: string) {
    this.modelColorSelection = event;
    this.changeDisplayedValue(event)
  }

  changeDisplayedValue(id:string) {
    switch (id) {
      case HuhIDs.Temperature:
        this.displayedValue = this.indexData.BME680['temperature[*C]'] + ' °C';
        break;
      case HuhIDs.Vibrations:
        this.displayedValue = this.indexData['Vibration[ms]'] + ' ms';
        break;
      case HuhIDs.Humidity:
        this.displayedValue = this.indexData.BME680['humidity[%]'] + ' %';
        break;
      case HuhIDs.BME680ECO2:
        this.displayedValue = this.indexData.BME680['eCO2[ppm]'] + ' ppm';
        break;
      case HuhIDs.BME680TVOC:
        this.displayedValue = this.indexData.BME680['bTVOC[ppm]'] + ' ppm';
        break;
      case HuhIDs.ATM:
        this.displayedValue = this.indexData.BME680['atmospheric_pressure[hPa]'] + ' hPa';
        break;
      case HuhIDs.IAQ:
        this.displayedValue = this.indexData.BME680.IAQ + '';
        break;
      case HuhIDs.SIAQ:
        this.displayedValue = this.indexData.BME680.sIAQ + '';
        break;
      case HuhIDs.CCS811ECO2:
        this.displayedValue = this.indexData.CCS811['ccs811_eCO2[ppm]'] + ' ppm';
        break;
      case HuhIDs.CCS811TVOC:
        this.displayedValue = this.indexData.CCS811['ccs811_eTVOC[ppb]'] + ' ppb';
        break;
      case HuhIDs.PM1:
        this.displayedValue = this.indexData.ZH03B['PM1.0[ug/m3]'] + ' ug/m3';
        break;
      case HuhIDs.PM25:
        this.displayedValue = this.indexData.ZH03B['PM2.5[ug/m3]'] + ' ug/m3';
        break;
      case HuhIDs.PM10:
        this.displayedValue = this.indexData.ZH03B['PM10[ug/m3]'] + ' ug/m3';
        break;

      default:
        this.displayedValue = null;
        break;
    }
  }
}
