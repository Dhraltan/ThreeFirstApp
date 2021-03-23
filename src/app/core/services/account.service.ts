import { Injectable } from '@angular/core';
import { UserDTO } from '@app/shared/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private user = null;
  private userStream: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(
    null
  );
  public user$: Observable<UserDTO> = this.userStream.asObservable();

  constructor() {}

  setUser(user: UserDTO): void {
    this.userStream.next(user);
    this.user = user;
  }

  getUser(): UserDTO {
    return this.user;
  }
}
