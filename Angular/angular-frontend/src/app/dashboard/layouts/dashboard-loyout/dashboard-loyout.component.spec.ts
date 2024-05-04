import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLoyoutComponent } from './dashboard-loyout.component';

describe('DashboardLoyoutComponent', () => {
  let component: DashboardLoyoutComponent;
  let fixture: ComponentFixture<DashboardLoyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLoyoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLoyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
