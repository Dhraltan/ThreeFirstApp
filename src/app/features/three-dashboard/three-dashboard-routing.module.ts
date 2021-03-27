import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPlyComponent } from './test-ply/test-ply.component';
import { ThreeDashboardComponent } from './three-dashboard-component/three-dashboard-component.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeDashboardComponent,
  },
  {
    path: 'ply',
    component: TestPlyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDashboardRoutingModule {}
