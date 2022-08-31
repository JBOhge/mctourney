import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from 'src/app/offline-tournament-tool/components/controls/controls.component';
import { MatchComponent } from 'src/app/offline-tournament-tool/components/match/match.component';
import { EightPlayerComponent } from 'src/app/offline-tournament-tool/components/overview/eight-player/eight-player.component';
import { FourPlayerComponent } from 'src/app/offline-tournament-tool/components/overview/four-player/four-player.component';
import { SixteenPlayerComponent } from 'src/app/offline-tournament-tool/components/overview/sixteen-player/sixteen-player.component';
import { PlayerListComponent } from 'src/app/offline-tournament-tool/components/player-list/player-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './components/overview/overview.component';
import { MatchListComponent } from './components/match-list/match-list.component';

const appRoutes: Routes = [
  { path: '', component: OverviewComponent },
];

@NgModule({
  declarations: [
    MatchComponent,
    MatchListComponent,
    ControlsComponent,
    OverviewComponent,
    FourPlayerComponent,
    EightPlayerComponent,
    SixteenPlayerComponent,
    PlayerListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
  ],
})
export class OfflineTournamentToolModule {}
