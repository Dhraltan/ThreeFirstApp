import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElasticService } from '@app/core/api/elastic.service';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { HitDTO } from '@app/shared/interfaces/DTO/HitDTO';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

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
  constructor(private router: Router, private elasticService: ElasticService, private computeColorsService: ComputeColorsService) {}

  async ngOnInit() {
    this.selectModel();
    this.indexData = (await this.getIndexData() as IndexDTO).hits.hits[0]._source;
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
    this.computeColorsService.clearColorData()
    return this.elasticService.getIndex().catch((err) => {
      console.error(err);
    });
    
  }

  changeModelColors(event: string) {
    this.modelColorSelection = event;
  }
}
