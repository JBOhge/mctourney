import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  tSizeSub!: Subscription;
  tSize: number = 0;

  constructor(private tService: TournamentService) {}

  ngOnInit(): void {
    this.tSizeSub = this.tService.size.subscribe((tSize) => {
      this.tSize = tSize;
    });
  }

  ngOnDestroy(): void {
    this.tSizeSub.unsubscribe();
  }
}
