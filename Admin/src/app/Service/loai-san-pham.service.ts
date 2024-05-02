import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoaiSanPhamService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/Loaisp/GetAll_Loai');
  }
  getAllTrangThai(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/Loaisp/GetAll_Loai_TrangThai');
  }
  create(Loai: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/Loaisp/Create_Loai', Loai);
  }
  update(Loai: any) {
    return this.http.put<any>(baseUrl + 'api/Loaisp/Update_Loai', Loai);
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/Loaisp/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/Loaisp/Delete_Loai/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/Loaisp/GetById_Loai/' + id);
  }
}
