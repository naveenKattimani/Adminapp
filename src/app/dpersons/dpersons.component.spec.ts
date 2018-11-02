import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpersonsComponent } from './dpersons.component';

describe('DpersonsComponent', () => {
  let component: DpersonsComponent;
  let fixture: ComponentFixture<DpersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
