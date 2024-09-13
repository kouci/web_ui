import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceDetailComponent } from './competence-detail.component';

describe('CompetenceDetailComponent', () => {
  let component: CompetenceDetailComponent;
  let fixture: ComponentFixture<CompetenceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenceDetailComponent]
    });
    fixture = TestBed.createComponent(CompetenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
