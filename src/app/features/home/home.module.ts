import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RoomSelectorComponent } from './components/room-selector/room-selector.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [HomeDashboardComponent, RoomSelectorComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
