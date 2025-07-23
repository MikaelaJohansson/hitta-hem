import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehomingComponent } from './rehoming.component';

describe('RehomingComponent', () => {
  let component: RehomingComponent;
  let fixture: ComponentFixture<RehomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RehomingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
