import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { InternalError } from '@app/shared/enum';
import { LoginPayload, RegisterPayload, UserDTO } from '@app/shared/interfaces';
import { ChangePasswordPayload } from '@app/shared/interfaces/Payload/ChangePasswordPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resourceUrl: string = '/auth';

  constructor(private apiService: ApiService) {}

  login(credentials: LoginPayload): Observable<UserDTO> {
    return this.apiService.post(`${this.resourceUrl}/login`, credentials).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.A_000,
        });
      })
    );
  }

  changePassword(credentials: ChangePasswordPayload): Observable<void> {
    return this.apiService.post(`${this.resourceUrl}/changePassword`, credentials).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.A_003,
        });
      })
    );
  }

  register(userData: RegisterPayload): Observable<void> {
    return this.apiService.post(`${this.resourceUrl}/register`, userData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.A_001,
          server: err.error.message
        });
      })
    );
  }

  logOut(): Observable<void> {
    return this.apiService.get(`${this.resourceUrl}/logout`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.A_002,
        });
      })
    );
  }
}
