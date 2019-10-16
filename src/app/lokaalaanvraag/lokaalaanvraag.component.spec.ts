import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokaalaanvraagComponent } from './lokaalaanvraag.component';

describe('LokaalaanvraagComponent', () => {
  let component: LokaalaanvraagComponent;
  let fixture: ComponentFixture<LokaalaanvraagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokaalaanvraagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokaalaanvraagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
