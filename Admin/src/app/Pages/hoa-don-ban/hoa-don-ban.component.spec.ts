import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaDonBanComponent } from './hoa-don-ban.component';

describe('HoaDonBanComponent', () => {
  let component: HoaDonBanComponent;
  let fixture: ComponentFixture<HoaDonBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoaDonBanComponent]
    });
    fixture = TestBed.createComponent(HoaDonBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
