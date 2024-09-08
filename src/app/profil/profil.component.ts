import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonalInfoDialogComponent } from '../edit-personal-info-dialog/edit-personal-info-dialog.component';
import { EditSkillsDialogComponent } from '../edit-skills-dialog/edit-skills-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    skills: ['Angular', 'TypeScript', 'JavaScript'],
    learningSkills: ['Python', 'Machine Learning'],
    trainingHours: 120,
    skillMatches: 10,
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPersonalInfoDialogComponent, {
      width: '400px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  openEditSkillsDialog(): void {
    const dialogRef = this.dialog.open(EditSkillsDialogComponent, {
      width: '400px',
      data: { skills: this.user.skills },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.skills = result;
      }
    });
  }
}
