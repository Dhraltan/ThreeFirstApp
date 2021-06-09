import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { InternalError } from '@app/shared/enum';
import { ContactPayload } from '@app/shared/interfaces/Payload/ContactPayload';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';

@Injectable({
  providedIn: 'root',
})
export class ElasticService {
  private readonly resourceUrl: string = '/elastic';

  constructor(private apiService: ApiService) {}

  getIndex(): Promise<IndexDTO> {
    return this.apiService.get(`${this.resourceUrl}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError({
          status: err.status,
          message: InternalError.E_000,
        });
      })
    ).toPromise();
  }
}
