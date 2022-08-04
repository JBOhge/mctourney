import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MatchPlayerInfoComponent } from './components/match-player-info/match-player-info.component';
import { MatchComponent } from './components/match/match.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsComponent } from './components/controls/controls.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FourPlayerComponent } from './components/overviews/four-player/four-player.component';
import { EightPlayerComponent } from './components/overviews/eight-player/eight-player.component';
import { SixteenPlayerComponent } from './components/overviews/sixteen-player/sixteen-player.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
