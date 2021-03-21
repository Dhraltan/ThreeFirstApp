import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { InternalError } from '@app/shared/enum';
import { LoginPayload, RegisterPayload, UserDTO } from '@app/shared/interfaces';

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

  register(userData: RegisterPayload): Observable<UserDTO> {
    return this.apiService.post(`${this.resourceUrl}/register`, userData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.A_001,
        });
      })
    );
  }

  logOut(): Observable<void> {
    return this.apiService.get(`${this.resourceUrl}/logout`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return throwError({
          status: err.status,
          message: InternalError.A_002,
        });
      })
    );
  }
}
