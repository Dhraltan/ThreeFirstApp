import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { InternalError } from '@app/shared/enum';
import { ContactPayload } from '@app/shared/interfaces/Payload/ContactPayload';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly resourceUrl: string = '/contact';

  constructor(private apiService: ApiService) {}

  sendEmail(body: ContactPayload): Observable<any> {
    return this.apiService.post(`${this.resourceUrl}/email`, body).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.U_000,
        });
      })
    )
  }
}
