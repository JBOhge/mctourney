import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './components/tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { TournamentOverviewComponent } from './components/tournament-overview/tournament-overview.component';

const appRoutes: Routes = [
  { path: 'tournament', component: OverviewComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'tournaments/create', component: TournamentCreateComponent },
  { path: 'tournaments/:id', component: TournamentOverviewComponent },
  { path: 'tournaments/:id/edit', component: TournamentEditComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
