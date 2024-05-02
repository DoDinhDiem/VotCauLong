import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class HoaDonNhapService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/HoaDonNhap/GetAll_HoaDonNhap');
  }
  create(HoaDonNhap: any): Observable<any> {
    return this.http.post<any>(
      baseUrl + 'api/HoaDonNhap/Create_HoaDonNhap',
      HoaDonNhap
    );
  }
  update(HoaDonNhap: any) {
    return this.http.put<any>(
      baseUrl + 'api/HoaDonNhap/Update_HoaDonNhap',
      HoaDonNhap
    );
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(
      baseUrl + 'api/HoaDonNhap/GetById_HoaDonNhap/' + id
    );
  }
}
