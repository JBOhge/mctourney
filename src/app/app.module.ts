import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module';
import { SharedModule } from './shared/shared/shared.module';
import { OfflineTournamentToolModule } from './offline-tournament-tool/offline-tournament-tool.module';
import { TournamentModule } from './tournament/tournament.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    OfflineTournamentToolModule,
    SharedModule,
    TournamentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
