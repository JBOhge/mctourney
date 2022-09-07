import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { OverviewEightPlayerComponent } from './components/overview-eight-player/overview-eight-player.component';
import { OverviewFourPlayerComponent } from './components/overview-four-player/overview-four-player.component';
import { OverviewSixteenPlayerComponent } from './components/overview-sixteen-player/overview-sixteen-player.component';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './components/tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { TournamentMatchComponent } from './components/tournament-match/tournament-match.component';
import { TournamentOverviewComponent } from './components/tournament-overview/tournament-overview.component';
import { AngularMaterialModule } from '../angular-material/angular-material/angular-material.module';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentRoutingModule } from './tournament-routing.module';
import { PublicListComponent } from './components/public-list/public-list.component';
import { MyListComponent } from './components/my-list/my-list.component';

@NgModule({
  declarations: [
    TournamentListComponent,
    TournamentOverviewComponent,
    TournamentEditComponent,
    TournamentCreateComponent,
    OverviewFourPlayerComponent,
    OverviewEightPlayerComponent,
    OverviewSixteenPlayerComponent,
    TournamentMatchComponent,
    DeleteConfirmDialogComponent,
    PublicListComponent,
    MyListComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    TournamentRoutingModule,
  ],
})
export class TournamentModule {}
