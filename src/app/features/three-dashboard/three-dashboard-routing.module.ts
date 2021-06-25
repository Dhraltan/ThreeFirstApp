import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';

const routes: Routes = [
  {
    path: 'nii3',
    component: ThreeDashboardComponent,
  },
  {
    path: 'nii3v1',
    component: ThreeDashboardComponent,
  },
  {
    path: 'nii2',
    component: ThreeDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDashboardRoutingModule {}
