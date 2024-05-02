import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class DanhMucSanPhamService {
  constructor(private http: HttpClient) {}
  GetSanPhamByLoai(
    id: any,
    thuonghieuid: any,
    sapxep: any,
    giaMax: any
  ): Observable<any[]> {
    const params = `?id=${id}&thuonghieuid=${thuonghieuid}&sapXep=${sapxep}&giaMax=${giaMax}`;
    return this.http.get<any[]>(baseUrl + `api/User/GetSanPhamToLoai${params}`);
  }

  GetGiaLonNhatTheoLoai(id: any) {
    return this.http.get<any>(baseUrl + 'api/User/GetPriceMax/' + id);
  }

  GetHangSanPham(id: any): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/User/GetHangSanPham/' + id);
  }
}
