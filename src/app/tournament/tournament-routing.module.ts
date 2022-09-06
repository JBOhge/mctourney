import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { TournamentEditComponent } from './components/tournament-edit/tournament-edit.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { TournamentOverviewComponent } from './components/tournament-overview/tournament-overview.component';

const appRoutes: Routes = [
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'tournaments/create', component: TournamentCreateComponent },
  { path: 'tournaments/:id', component: TournamentOverviewComponent },
  {
    path: 'tournaments/:id/edit',
    component: TournamentEditComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class TournamentRoutingModule {}
