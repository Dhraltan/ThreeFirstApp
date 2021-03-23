import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/api';
import { AccountService } from './core/services/account.service';
import { URLS } from './shared/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  async getUserDetails(): Promise<void> {
    await this.userService
      .getUserDetails()
      .then((user) => {
        this.accountService.setUser(user);
      })
      .catch((err) => {
        this.accountService.setUser(null);
        this.router.navigate([URLS.LOGIN]);
      });
  }
}
