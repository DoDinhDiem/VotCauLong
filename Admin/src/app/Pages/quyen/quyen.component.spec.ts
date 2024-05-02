import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyenComponent } from './quyen.component';

describe('QuyenComponent', () => {
  let component: QuyenComponent;
  let fixture: ComponentFixture<QuyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuyenComponent]
    });
    fixture = TestBed.createComponent(QuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
