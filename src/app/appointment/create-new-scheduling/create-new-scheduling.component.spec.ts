import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSchedulingComponent } from './create-new-scheduling.component';

describe('CreateNewSchedulingComponent', () => {
  let component: CreateNewSchedulingComponent;
  let fixture: ComponentFixture<CreateNewSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewSchedulingComponent]
    });
    fixture = TestBed.createComponent(CreateNewSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
