import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class TinTucService {
  constructor(private http: HttpClient) {}

  GetTinTuc(): Observable<any[]> {
    return this.http.get<any>(baseUrl + 'api/User/GetTinTuc');
  }

  GetTinTucById(id: any) {
    return this.http.get<any>(baseUrl + 'api/User/GetTinTucById/' + id);
  }

  GetTinTucTuongTu(id: any) {
    return this.http.get<any>(baseUrl + 'api/User/GetTinTucTuongTu/' + id);
  }
}
