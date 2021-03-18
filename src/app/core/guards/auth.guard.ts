import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { URLS } from '@app/shared/enum';
import { Observable } from 'rxjs';
import { UserService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getUserDetails();
  }

  async getUserDetails() {
    return await this.userService
      .getUserDetails()
      .then((user) => {
        return true;
      })
      .catch((err) => {
        this.router.navigate([URLS.LOGIN])
        return false;
      });
  }
}
