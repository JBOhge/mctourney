import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MatchPlayerInfoComponent } from './components/match-player-info/match-player-info.component';
import { MatchComponent } from './components/match/match.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlsComponent } from './components/controls/controls.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FourPlayerComponent } from './components/overviews/four-player/four-player.component';
import { EightPlayerComponent } from './components/overviews/eight-player/eight-player.component';
import { SixteenPlayerComponent } from './components/overviews/sixteen-player/sixteen-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { TournamentOverviewComponent } from './components/tournament-overview/tournament-overview.component';
import { TournamentEditComponent } from './components/tournament-edit/tournament-edit.component';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { OverviewEightPlayerComponent } from './components/tournament-overview/overviews/overview-eight-player/overview-eight-player.component';
import { OverviewFourPlayerComponent } from './components/tournament-overview/overviews/four-player/overview-four-player.component';
import { OverviewSixteenPlayerComponent } from './components/tournament-overview/overviews/overview-sixteen-player/overview-sixteen-player.component';
import { TournamentMatchComponent } from './components/tournament-match/tournament-match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MatchPlayerInfoComponent,
    MatchComponent,
    MatchListComponent,
    ControlsComponent,
    OverviewComponent,
    FourPlayerComponent,
    EightPlayerComponent,
    SixteenPlayerComponent,
    PlayerListComponent,
    NavbarComponent,
    HomepageComponent,
    TournamentListComponent,
    TournamentOverviewComponent,
    TournamentEditComponent,
    TournamentCreateComponent,
    OverviewFourPlayerComponent,
    OverviewEightPlayerComponent,
    OverviewSixteenPlayerComponent,
    TournamentMatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
