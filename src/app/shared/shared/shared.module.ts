import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPlayerInfoComponent } from 'src/app/shared/shared/components/match-player-info/match-player-info.component';

@NgModule({
  declarations: [MatchPlayerInfoComponent],
  imports: [CommonModule],
  exports: [MatchPlayerInfoComponent],
})
export class SharedModule {}
