import { Component } from '@angular/core';
import { HeThongService } from 'src/app/Service/he-thong.service';

@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css'],
})
export class LienHeComponent {
  constructor(private heThongService: HeThongService) {}

  ngOnInit() {
    this.GetLienHe();
  }

  contact: any = {};
  GetLienHe() {
    this.heThongService.GetLienHe().subscribe((data) => {
      this.contact = data;
    });
  }
}
