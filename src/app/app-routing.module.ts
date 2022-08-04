import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './components/match/match.component';
import { OverviewComponent } from './components/overview/overview.component';

const appRoutes: Routes = [{path: '', component: OverviewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
