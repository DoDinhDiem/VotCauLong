import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeThongService } from 'src/app/Service/he-thong.service';
import { TinTucService } from 'src/app/Service/tin-tuc.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-chi-tiet-tin-tuc',
  templateUrl: './chi-tiet-tin-tuc.component.html',
  styleUrls: ['./chi-tiet-tin-tuc.component.css'],
})
export class ChiTietTinTucComponent {
  baseUrl = baseUrl;

  constructor(
    private newsPaperService: TinTucService,
    private heThongService: HeThongService,
    private route: ActivatedRoute
  ) {}
  id!: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.GetChiTietSanPham(this.id);
    });
    this.GetLoaiSanPham();
  }

  loaiSanPham: any[] = [];
  GetLoaiSanPham() {
    this.heThongService.GetLoaiSanPham().subscribe((data) => {
      this.loaiSanPham = data;
    });
  }

  tinTuc: any;
  GetChiTietSanPham(id: any) {
    this.newsPaperService.GetTinTucById(id).subscribe((data) => {
      this.tinTuc = data;
      console.table(data);
      this.GetTinTucTuongTu(id);
    });
  }

  tinTucTuongTu: any[] = [];
  GetTinTucTuongTu(id: any) {
    this.newsPaperService.GetTinTucTuongTu(id).subscribe((data) => {
      this.tinTucTuongTu = data;
      console.table(data);
    });
  }
}
