import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharyBackendService } from '../services/shary-backend/shary-backend.service';
import { Competence } from '../models/competence-data.model';

@Component({
  selector: 'app-edit-skills-dialog',
  templateUrl: './edit-skills-dialog.component.html',
  styleUrls: ['./edit-skills-dialog.component.css']
})
export class EditSkillsDialogComponent {
  skillControl = new FormControl('');
  filteredSkills: Observable<Competence[]>;
  allSkills: Competence[] = [];
  userSkills: Competence[]; // Liste des compétences actuelles de l'utilisateur

  constructor(
    public dialogRef: MatDialogRef<EditSkillsDialogComponent>,
    private sharyBackendService: SharyBackendService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userSkills = data.skills;
    this.loadSkills();
    this.filteredSkills = this.skillControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private loadSkills(): void {
    // Charger toutes les compétences disponibles depuis le service
    this.sharyBackendService.getAllCompetences().subscribe(skills => {
      this.allSkills = skills;
    });
  }

  private _filter(value: string): Competence[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.comptenceName.toLowerCase().includes(filterValue));
  }

  addSkill(skill: Competence): void {
    if (skill && !this.userSkills.includes(skill)) {
      this.userSkills.push(skill);
    }
    this.skillControl.setValue('');
  }

  removeSkill(skill: Competence): void {
    const index = this.userSkills.indexOf(skill);
    if (index >= 0) {
      this.userSkills.splice(index, 1);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.userSkills); // Retourner les compétences modifiées
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
