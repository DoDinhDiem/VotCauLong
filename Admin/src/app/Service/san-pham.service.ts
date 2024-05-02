import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class SanPhamService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/SanPham/GetAll_SanPham');
  }
  create(SanPham: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/SanPham/Create_SanPham', SanPham);
  }
  update(SanPham: any) {
    return this.http.put<any>(baseUrl + 'api/SanPham/Update_SanPham', SanPham);
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/SanPham/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/SanPham/Delete_SanPham/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/SanPham/GetById_SanPham/' + id);
  }

  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post(baseUrl + 'api/SanPham/Upload_Image', formData);
  }
}
