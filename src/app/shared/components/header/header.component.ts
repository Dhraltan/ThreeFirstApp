import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { URLS } from '@app/shared/enum';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut().subscribe(
      (res) => {
        this.router.navigate([URLS.LOGIN]);
        this.notification.success('Success', 'Log out was successful', {
          nzClass: 'success-notification',
        });
      },
      (error) => {
        console.error(error);
        this.notification.error('Failed', error.message, {
          nzClass: 'error-notification',
        });
      }
    );
  }
}
