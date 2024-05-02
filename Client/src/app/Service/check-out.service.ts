import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  GetLinkVnpay(hoadon: any) {
    return this.http.post<any>(baseUrl + 'api/VNPAY/VnPay', hoadon);
  }

  GetKhacHangById(id: any) {
    return this.http.get<any>(baseUrl + 'api/User/GetKhacHangById/' + id);
  }

  createHoaDonBan(HoaDonBan: any): Observable<any> {
    return this.http.post<any>(
      baseUrl + 'api/User/Create_HoaDonBan',
      HoaDonBan
    );
  }
}
