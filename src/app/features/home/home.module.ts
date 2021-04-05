import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RoomSelectorComponent } from './components/room-selector/room-selector.component';



@NgModule({
  declarations: [HomeDashboardComponent, RoomSelectorComponent],
  imports: [
    CommonModule, HomeRoutingModule
  ]
})
export class HomeModule { }
