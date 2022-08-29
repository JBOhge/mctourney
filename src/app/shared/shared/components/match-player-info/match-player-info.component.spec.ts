import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayerInfoComponent } from './match-player-info.component';

describe('MatchPlayerInfoComponent', () => {
  let component: MatchPlayerInfoComponent;
  let fixture: ComponentFixture<MatchPlayerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPlayerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
