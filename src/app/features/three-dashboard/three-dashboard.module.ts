import { NgModule } from '@angular/core';

import { ThreeDashboardRoutingModule } from './three-dashboard-routing.module';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';
import { TestPlyComponent } from './test-ply/test-ply.component';
import { SharedModule } from '@app/shared/shared.module';
import { PlyLucianComponent } from './ply-lucian/ply-lucian.component';

@NgModule({
  declarations: [ThreeDashboardComponent, TestPlyComponent, PlyLucianComponent],
  imports: [SharedModule, ThreeDashboardRoutingModule],
})
export class ThreeDashboardModule {}
