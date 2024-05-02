import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class LienHeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/LienHe/GetAll_LienHe');
  }
  create(LienHe: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/LienHe/Create_LienHe', LienHe);
  }
  update(LienHe: any) {
    return this.http.put<any>(baseUrl + 'api/LienHe/Update_LienHe', LienHe);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/LienHe/Delete_LienHe/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/LienHe/GetById_LienHe/' + id);
  }
}
