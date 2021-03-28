import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactDashboardComponent } from './contact-dashboard/contact-dashboard.component';

@NgModule({
  declarations: [ContactDashboardComponent],
  imports: [SharedModule, ContactRoutingModule],
})
export class ContactModule {}
