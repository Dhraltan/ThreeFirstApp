import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@app/shared/shared.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    NzSelectModule
  ]
})
export class AuthModule { }
