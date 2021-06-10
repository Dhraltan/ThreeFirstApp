import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

@Component({
  selector: 'app-three-dashboard-component',
  templateUrl: './three-dashboard-component.component.html',
  styleUrls: ['./three-dashboard-component.component.scss'],
})
export class ThreeDashboardComponent implements OnInit {
  selectedIndex = 0;
  modelColorSelection: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.selectModel();
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

  changeModelColors(event) {
    this.modelColorSelection = event
  }
}
