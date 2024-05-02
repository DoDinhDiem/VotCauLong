import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucSanPhamComponent } from './danh-muc-san-pham.component';

describe('DanhMucSanPhamComponent', () => {
  let component: DanhMucSanPhamComponent;
  let fixture: ComponentFixture<DanhMucSanPhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhMucSanPhamComponent]
    });
    fixture = TestBed.createComponent(DanhMucSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
