import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class TinTucService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/TinTuc/GetAll_TinTuc');
  }
  create(TinTuc: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/TinTuc/Create_TinTuc', TinTuc);
  }
  update(TinTuc: any) {
    return this.http.put<any>(baseUrl + 'api/TinTuc/Update_TinTuc', TinTuc);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/TinTuc/Delete_TinTuc/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/TinTuc/GetById_TinTuc/' + id);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(baseUrl + 'api/TinTuc/Upload_Image', formData);
  }
}
