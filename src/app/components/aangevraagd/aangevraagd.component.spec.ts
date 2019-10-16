import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AangevraagdComponent } from './aangevraagd.component';

describe('AangevraagdComponent', () => {
  let component: AangevraagdComponent;
  let fixture: ComponentFixture<AangevraagdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AangevraagdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AangevraagdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
