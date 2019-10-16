import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AanvraagComponent } from './aanvraag.component';

describe('AanvraagComponent', () => {
  let component: AanvraagComponent;
  let fixture: ComponentFixture<AanvraagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AanvraagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AanvraagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
