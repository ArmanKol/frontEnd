import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokaalaangevraagdComponent } from './lokaalaangevraagd.component';

describe('LokaalaangevraagdComponent', () => {
  let component: LokaalaangevraagdComponent;
  let fixture: ComponentFixture<LokaalaangevraagdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokaalaangevraagdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokaalaangevraagdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
