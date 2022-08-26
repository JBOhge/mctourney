import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TournamentDataService } from 'src/app/services/tournament-data.service';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { tournamentId: string; tournamentName: string },
    private tDataService: TournamentDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onDeleteConfirm() {
    this.tDataService.deleteTournament(this.data.tournamentId).subscribe({
      next: () => {
        this.router.navigate(['/tournaments']);
      },
    });
  }
}
