import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourPlayerComponent } from './four-player.component';

describe('FourPlayerComponent', () => {
  let component: FourPlayerComponent;
  let fixture: ComponentFixture<FourPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
