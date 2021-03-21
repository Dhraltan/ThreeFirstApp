import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { URLS } from '@app/shared/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut().subscribe(
      (res) => {
        this.router.navigate([URLS.LOGIN]);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
