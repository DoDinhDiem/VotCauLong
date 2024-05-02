import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'api/Slide/GetAll_Slide');
  }
  create(Slide: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'api/Slide/Create_Slide', Slide);
  }
  update(Slide: any) {
    return this.http.put<any>(baseUrl + 'api/Slide/Update_Slide', Slide);
  }
  toggleTrangThai(id: any) {
    return this.http.put<any>(baseUrl + `api/Slide/TrangThai/${id}`, null);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'api/Slide/Delete_Slide/' + id);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(baseUrl + 'api/Slide/GetById_Slide/' + id);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(baseUrl + 'api/Slide/Upload_Image', formData);
  }
}
