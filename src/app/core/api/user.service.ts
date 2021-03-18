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
export class UserService {
  private readonly resourceUrl: string = '/user';

  constructor(private apiService: ApiService) {}

  getUserDetails(): Promise<UserDTO> {
    return this.apiService.get(`${this.resourceUrl}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.U_000,
        });
      })
    ).toPromise();
  }
}
