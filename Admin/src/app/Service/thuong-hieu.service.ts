import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ThuongHieuService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/ThuongHieu/GetAll_ThuongHieu');
  }
  getAllTrangThai(): Observable<any[]> {
    return this.http.get<any[]>(
      baseUrl + 'api/ThuongHieu/GetAll_ThuongHieu_TrangThai'
    );
  }
  create(Loai: any): Observable<any> {
    return this.http.post<any>(
      baseUrl + 'api/ThuongHieu/Create_ThuongHieu',
      Loai
    );
  }
  update(Loai: any) {
    return this.http.put<any>(
      baseUrl + 'api/ThuongHieu/Update_ThuongHieu',
      Loai
    );
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/ThuongHieu/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      baseUrl + 'api/ThuongHieu/Delete_ThuongHieu/' + id
    );
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(
      baseUrl + 'api/ThuongHieu/GetById_ThuongHieu/' + id
    );
  }
}
