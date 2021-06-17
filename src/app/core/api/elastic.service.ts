import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { InternalError } from '@app/shared/enum';
import { ContactPayload } from '@app/shared/interfaces/Payload/ContactPayload';
import { IndexDTO } from '@app/shared/interfaces/DTO/IndexDTO';
import { ElasticSearchOptions } from '@app/shared/enum/ElasticSearchOptions';

@Injectable({
  providedIn: 'root',
})
export class ElasticService {
  private readonly resourceUrl: string = '/elastic';

  constructor(private apiService: ApiService) {}

  getIndex(startDate: Date, endDate: Date, option: string): Promise<IndexDTO> {
    if(option == ElasticSearchOptions.LastMeasurement){
      startDate = null;
      endDate = null;
    }
    return this.apiService
      .post(`${this.resourceUrl}`, {
        startDate: startDate,
        endDate: endDate,
        option: option,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 404) {
            return throwError({
              status: err.status,
              message: InternalError.E_001,
            });
          }
          return throwError({
            status: err.status,
            message: InternalError.E_000,
          });
        })
      )
      .toPromise();
  }
}
