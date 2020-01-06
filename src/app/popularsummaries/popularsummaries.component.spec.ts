import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularsummariesComponent } from './popularsummaries.component';

describe('PopularsummariesComponent', () => {
  let component: PopularsummariesComponent;
  let fixture: ComponentFixture<PopularsummariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularsummariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularsummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
