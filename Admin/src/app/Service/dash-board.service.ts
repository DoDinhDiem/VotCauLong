import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  constructor(private http: HttpClient) {}

  getCountDonHang() {
    return this.http.get<any>(baseUrl + 'api/DashBoard/CountDonHang');
  }

  getCountDoanhThu() {
    return this.http.get<any>(baseUrl + 'api/DashBoard/CountDoanhThu');
  }

  getCountSanPham() {
    return this.http.get<any>(baseUrl + 'api/DashBoard/CountSanPham');
  }

  getCountKhachHang() {
    return this.http.get<any>(baseUrl + 'api/DashBoard/CountKhachHang');
  }

  getThongKeTheoThang(year: any) {
    return this.http.get<any>(
      baseUrl + 'api/DashBoard/ThongKeTheoThang/' + year
    );
  }
}
