import { Component } from '@angular/core';
import { TinTucService } from 'src/app/Service/tin-tuc.service';
import { baseUrl } from 'src/app/baseUrl';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css'],
})
export class TinTucComponent {
  baseUrl = baseUrl;

  constructor(private newsPaperService: TinTucService) {}

  ngOnInit() {
    this.GetTinTuc();
  }

  newpaper: any;
  GetTinTuc() {
    this.newsPaperService.GetTinTuc().subscribe((data) => {
      this.newpaper = data;
    });
  }

  //Phân trang
  p: number = 1;
}
