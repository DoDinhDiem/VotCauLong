import { Component } from '@angular/core';
import { DashBoardService } from 'src/app/Service/dash-board.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  currentDate!: Date;
  constructor(private dashboardService: DashBoardService) {}
  ngOnInit() {
    this.currentDate = new Date();
    this.selectedYear = new Date().getFullYear();
    this.initializeYears();
    this.thongkeDay(this.selectedYear);
    this.getCountDonHang();
    this.getCountDoanhThu();
    this.getCountKhachHang();
    this.getCountSanPham();
    console.log(this.selectedYear);
  }

  years: number[] = [];
  selectedYear!: number;
  initializeYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  countDonHang: number = 0;
  getCountDonHang() {
    this.dashboardService.getCountDonHang().subscribe((res) => {
      this.countDonHang = res;
    });
  }

  countDoanhThu: number = 0;
  getCountDoanhThu() {
    this.dashboardService.getCountDoanhThu().subscribe((res) => {
      this.countDoanhThu = res;
    });
  }

  countSanPham: number = 0;
  getCountSanPham() {
    this.dashboardService.getCountSanPham().subscribe((res) => {
      this.countSanPham = res;
    });
  }

  countKhachHang: number = 0;
  getCountKhachHang() {
    this.dashboardService.getCountKhachHang().subscribe((res) => {
      this.countKhachHang = res;
    });
  }

  data: any;
  options: any;
  totalMonthNow: any[] = [];
  tongNamNow: number = 0;
  thongkeDay(year: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dashboardService.getThongKeTheoThang(year).subscribe((dataMonth) => {
      this.totalMonthNow = dataMonth.thongKeThang;
      this.tongNamNow = dataMonth.tongTienNam;
      this.data = {
        labels: [
          'T1',
          'T2',
          'T3',
          'T4',
          'T5',
          'T6',
          'T7',
          'T8',
          'T9',
          'T10',
          'T11',
          'T12',
        ],
        datasets: [
          {
            label: 'Năm hiện tại',
            data: this.totalMonthNow.map((item) => item.tongTien),
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4,
          },
        ],
      };
    });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
