import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const scripts = [
      'assets/vendor/tinymce/tinymce.min.js',
      'assets/vendor/simple-datatables/simple-datatables.js',
      'assets/vendor/php-email-form/validate.js',
      'assets/js/main.js',
    ];

    scripts.forEach((script) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = script;
      document.body.appendChild(scriptElement);
    });
  }

  // <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  // <script src="assets/vendor/chart.js/chart.umd.js"></script>
  // <script src="assets/vendor/echarts/echarts.min.js"></script>
  // <script src="assets/vendor/quill/quill.js"></script>
  // <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
  // <script src="assets/vendor/tinymce/tinymce.min.js"></script>
  // <script src="assets/vendor/php-email-form/validate.js"></script>

  // <!-- Template Main JS File -->
  // <script src="assets/js/main.js"></script>
}
