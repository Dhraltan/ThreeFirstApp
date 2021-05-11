import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhiozdanComponent } from './ghiozdan/ghiozdan.component';
import { PlyLucianComponent } from './ply-lucian/ply-lucian.component';
import { TestPlyComponent } from './test-ply/test-ply.component';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';

const routes: Routes = [
  {
    path: 'cube',
    component: ThreeDashboardComponent,
  },
  {
    path: 'ply',
    component: TestPlyComponent,
  },
  {
    path: 'lucian',
    component: PlyLucianComponent
  },
  {
    path: 'ghiozdan',
    component: GhiozdanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDashboardRoutingModule {}
