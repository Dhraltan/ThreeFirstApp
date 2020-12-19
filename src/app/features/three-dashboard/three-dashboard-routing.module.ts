import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeDashboardComponent } from './three-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeDashboardRoutingModule { }
