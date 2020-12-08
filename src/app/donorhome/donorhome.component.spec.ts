import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorhomeComponent } from './donorhome.component';

describe('DonorhomeComponent', () => {
  let component: DonorhomeComponent;
  let fixture: ComponentFixture<DonorhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
