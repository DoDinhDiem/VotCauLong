import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienComponent } from './nhan-vien.component';

describe('NhanVienComponent', () => {
  let component: NhanVienComponent;
  let fixture: ComponentFixture<NhanVienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhanVienComponent]
    });
    fixture = TestBed.createComponent(NhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
