import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDashboardRoutingModule } from './three-dashboard-routing.module';
import { ThreeDashboardComponent } from './three-dashboard.component';


@NgModule({
  declarations: [ThreeDashboardComponent],
  imports: [
    CommonModule,
    ThreeDashboardRoutingModule
  ]
})
export class ThreeDashboardModule { }
