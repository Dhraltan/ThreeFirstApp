import { NgModule } from '@angular/core';

import { ThreeDashboardRoutingModule } from './three-dashboard-routing.module';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';
import { SharedModule } from '@app/shared/shared.module';
import { ThreeHudComponent } from './components/three-hud/three-hud.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ThreeRendererComponent } from './components/three-renderer/three-renderer.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Nii2Component } from './components/nii2/nii2.component';
import { Nii3Component } from './components/nii3/nii3.component';


@NgModule({
  declarations: [ThreeDashboardComponent, ThreeHudComponent, ThreeRendererComponent, Nii2Component, Nii3Component],
  imports: [SharedModule, ThreeDashboardRoutingModule, NzRadioModule, NzDatePickerModule],
})
export class ThreeDashboardModule {}
