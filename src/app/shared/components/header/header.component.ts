import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { AccountService } from '@app/core/services/account.service';
import { URLS } from '@app/shared/enum';
import { UserDTO } from '@app/shared/interfaces';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  currentUser: UserDTO;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService,
    private accountService: AccountService
  ) {
    this.subscriptions.add(this.accountService.user$.subscribe((user)=>{
      this.currentUser = user
    }))
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  redirectToHome(){
    console.log('works')
    this.router.navigateByUrl(URLS.LOGIN)
  }

  logOut() {
    this.authService.logOut().subscribe(
      (res) => {
        this.accountService.setUser(null);
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
