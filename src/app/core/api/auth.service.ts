import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly resourceUrl: string = '/auth';

  constructor(private apiService:ApiService) { }

  login(credentials): Observable<any> {
    return this.apiService.post(`${this.resourceUrl}/login`, credentials).pipe(
      catchError((err 
        // :HttpErrorResponse
        ) => {
        return throwError({
          status: err.status,
          // message: InternalError.A_000,
           message: "Eroare",
        });
      })
    );
  }
}
