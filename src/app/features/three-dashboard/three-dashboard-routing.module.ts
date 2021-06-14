import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhiozdanComponent } from './ghiozdan/ghiozdan.component';
import { PlyLucianComponent } from './ply-lucian/ply-lucian.component';
import { TestPlyComponent } from './test-ply/test-ply.component';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';

const routes: Routes = [
  {
    path: 'nii3',
    component: ThreeDashboardComponent,
  },
  {
    path: 'nii8',
    component: TestPlyComponent,
  },
  {
    path: 'nii2',
    component: GhiozdanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDashboardRoutingModule {}
