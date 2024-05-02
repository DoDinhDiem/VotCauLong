import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class NhanVienService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/NhanVien/GetAll_NhanVien');
  }
  create(NhanVien: any): Observable<any> {
    return this.http.post<any>(
      baseUrl + 'api/NhanVien/Create_NhanVien',
      NhanVien
    );
  }
  update(NhanVien: any) {
    return this.http.put<any>(
      baseUrl + 'api/NhanVien/Update_NhanVien',
      NhanVien
    );
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/NhanVien/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      baseUrl + 'api/NhanVien/Delete_NhanVien/' + id
    );
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/NhanVien/GetById_NhanVien/' + id);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(baseUrl + 'api/NhanVien/Upload_Image', formData);
  }
}
