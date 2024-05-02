import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ngAfterViewInit() {
    // Tạo phần tử script cho các thư viện bạn muốn sử dụng
    const scripts = [
      'assets/js/jquery-1.11.1.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/bootstrap-hover-dropdown.min.js',
      'assets/js/owl.carousel.min.js',
      'assets/js/echo.min.js',
      'assets/js/jquery.easing-1.3.min.js',
      'assets/js/bootstrap-slider.min.js',
      'assets/js/jquery.rateit.min.js',
      'assets/js/lightbox.min.js',
      'assets/js/bootstrap-select.min.js',
      'assets/js/wow.min.js',
      'assets/js/scripts.js',
    ];

    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    });
  }
}
