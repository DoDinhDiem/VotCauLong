import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class QuyenService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/Quyen/GetAll_Quyen');
  }
  getAllTrangThai(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/Quyen/GetAll_Quyen_TrangThai');
  }

  create(Quyen: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/Quyen/Create_Quyen', Quyen);
  }
  update(Quyen: any) {
    return this.http.put<any>(baseUrl + 'api/Quyen/Update_Quyen', Quyen);
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/Quyen/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/Quyen/Delete_Quyen/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/Quyen/GetById_Quyen/' + id);
  }
}
