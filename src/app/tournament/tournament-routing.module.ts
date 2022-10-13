import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListComponent } from './components/my-list/my-list.component';
import { PublicListComponent } from './components/public-list/public-list.component';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './components/tournament-edit/tournament-edit.component';
import { TournamentOverviewComponent } from './components/tournament-overview/tournament-overview.component';

const appRoutes: Routes = [
  { path: 'tournaments', component: PublicListComponent },
  { path: 'tournaments/create', component: TournamentCreateComponent },
  { path: 'tournaments/mytournaments', component: MyListComponent },
  { path: 'tournaments/:id', component: TournamentOverviewComponent },
  {
    path: 'tournaments/:id/edit',
    component: TournamentEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class TournamentRoutingModule {}
