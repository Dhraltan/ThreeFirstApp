import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  get(path: string, params = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { params: params });
  }

  put(path: string, body = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body);
  }

  post(path: string, body = {}, params = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body, { params: params });
  }

  delete(path:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`, {});
  }
}
