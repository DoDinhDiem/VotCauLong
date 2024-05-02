import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class HoaDonBanService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/HoaDonBan/GetAll_HoaDonBan');
  }
  update(HoaDonBan: any) {
    return this.http.put<any>(
      baseUrl + 'api/HoaDonBan/Update_HoaDonBan',
      HoaDonBan
    );
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(
      baseUrl + 'api/HoaDonBan/GetById_HoaDonBan/' + id
    );
  }
}
