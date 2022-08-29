import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EightPlayerComponent } from './eight-player.component';

describe('EightPlayerComponent', () => {
  let component: EightPlayerComponent;
  let fixture: ComponentFixture<EightPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EightPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EightPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
