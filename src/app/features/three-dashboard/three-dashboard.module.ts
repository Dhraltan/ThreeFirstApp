import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDashboardRoutingModule } from './three-dashboard-routing.module';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';
import { TestPlyComponent } from './test-ply/test-ply.component';

@NgModule({
  declarations: [ThreeDashboardComponent, TestPlyComponent],
  imports: [CommonModule, ThreeDashboardRoutingModule],
})
export class ThreeDashboardModule {}
