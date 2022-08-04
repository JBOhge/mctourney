import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixteenPlayerComponent } from './sixteen-player.component';

describe('SixteenPlayerComponent', () => {
  let component: SixteenPlayerComponent;
  let fixture: ComponentFixture<SixteenPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixteenPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixteenPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
