import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// NG Zorro
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { HeaderComponent } from './components/header/header.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { LoadingGifComponent } from './components/loading-gif/loading-gif.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ValidationMessageComponent,
    LoadingGifComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // NG Zorro
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzNotificationModule,
    NzPopoverModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    HeaderComponent,
    ValidationMessageComponent,
    LoadingGifComponent,

    // NG Zorro
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzNotificationModule,
    NzPopoverModule,
  ],
})
export class SharedModule {}
